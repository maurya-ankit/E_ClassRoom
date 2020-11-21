from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ClassroomApi.models import ClassRoom, ClassSettings, ClassStudent, ClassPost, ClassPostComment, ClassTeacher
from ClassroomApi.serializers import (
    ClassRoomSerializer,
    ClassRoomCreateSerializer,
    ClassSettingsSerializer,
    ClassStudentJoinSerializers,
    ClassStudentListSerializer,
    ClassPostListSerializer,
    ClassPostRetrieveSerializer,
    ClassPostCommentListSerializer, ClassTeacherListSerializer,
)


class ClassRoomListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    serializer_class = ClassRoomSerializer

    def get_queryset(self):
        print(self.request.user)
        obj = ClassStudent.objects.filter(student_fk=self.request.user)
        user_class_list = []
        for _ in range(len(obj)):
            user_class_list.append(obj[_].class_fk)
        obj = ClassTeacher.objects.filter(teacher_fk=self.request.user)
        for _ in range(len(obj)):
            user_class_list.append(obj[_].class_fk)
        return user_class_list


class ClassDetailView(RetrieveAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomCreateSerializer


class ClassRoomCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClassRoomCreateSerializer

    def perform_create(self, serializer):
        print(self.request.user)

        serializer.save(admin_id=self.request.user.pk)


class ClassSettingsRetrieveView(RetrieveAPIView):
    queryset = ClassSettings.objects.all()
    serializer_class = ClassSettingsSerializer


class ClassSettingsUpdateView(CreateAPIView):
    queryset = ClassSettings.objects.all()
    serializer_class = ClassSettingsSerializer

    def perform_create(self, serializer):
        serializer.save(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))


class ClassStudentJoinView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClassStudentJoinSerializers

    def perform_create(self, serializer):
        print(self.request.data['class_code'])
        if ClassTeacher.objects.filter(teacher_fk=self.request.user):
            raise ValidationError("You are teacher of this Class")
        serializer.save(class_fk=ClassRoom.objects.get(class_code=self.request.data['class_code']),
                        student_fk=self.request.user)


class ClassStudentListView(ListAPIView):
    serializer_class = ClassStudentListSerializer

    def get_queryset(self):
        return ClassStudent.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))


class ClassTeacherListView(ListAPIView):
    serializer_class = ClassTeacherListSerializer

    def get_queryset(self):
        return ClassTeacher.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))


class ClassPostListView(ListAPIView):
    serializer_class = ClassPostRetrieveSerializer

    def get_queryset(self):
        return ClassPost.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']))


class ClassPostCreateView(CreateAPIView):
    serializer_class = ClassPostListSerializer

    def perform_create(self, serializer):
        serializer.save(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']),
                        post_creator=User.objects.get(pk=self.request.user.pk))


class ClassPostCommentListView(ListAPIView):
    serializer_class = ClassPostCommentListSerializer

    def get_queryset(self):
        return ClassPostComment.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']),
                                               post_fk=ClassPost.objects.get(pk=self.request.GET['post_id']), )


class ClassPostCommentCreateView(CreateAPIView):
    serializer_class = ClassPostCommentListSerializer

    def perform_create(self, serializer):
        serializer.save(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']),
                        post_fk=ClassPost.objects.get(pk=self.request.GET['post_id']),
                        commenter=User.objects.get(pk=self.request.user.pk))


class ClassPostCommentRetrieveView(RetrieveAPIView):
    serializer_class = ClassPostCommentListSerializer

    def get_queryset(self):
        return ClassPostComment.objects.filter(class_fk=ClassRoom.objects.get(pk=self.request.GET['class_id']),
                                               post_fk=ClassPost.objects.get(pk=self.request.GET['post_id']), )
