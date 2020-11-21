from django.contrib import admin

# Register your models here.
from ClassroomApi.models import *

admin.site.register(ClassRoom)
admin.site.register(ClassPost)
admin.site.register(ClassPostComment)
admin.site.register(ClassSettings)
admin.site.register(ClassStudent)
admin.site.register(ClassTeacher)
