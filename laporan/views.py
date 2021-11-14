from django.shortcuts import render
from laporan.forms import *
import logging

def study_report(request):
    logging.basicConfig(level=logging.NOTSET)
    if request.POST:
        form = StudyForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            form = StudyForm()
            message = "Laporan berhasil dibuat"
            context = {
                'form': form,
                'msg': message
            }
    
            return render(request, 'laporan-belajar.html', context)
        
    else:
        form = StudyForm(initial={'employee_id': request.user})

        context = {'form': form}

    return render(request, 'laporan-belajar.html', context)