from django.shortcuts import render
from laporan.forms import *
import logging
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required


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

@login_required
def guidance_report(request):
    logging.basicConfig(level=logging.NOTSET)
    
    if request.POST:
        form = GuidanceForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            form = GuidanceForm()
            message = "Laporan berhasil dibuat"
            context = {
                'form': form,
                'msg': message
            }
    
            return render(request, 'laporan-bimbingan.html', context)
        
        else:
            print(form.errors)
        
        
    else:
        form = GuidanceForm(initial={'employee_id': request.user.employee})
        context = {'form': form}
        return render(request, 'laporan-bimbingan.html', context) 
    
    # return render(request, 'laporan-bimbingan.html', context)
    
@login_required
def scientific_work_report(request):
    logging.basicConfig(level=logging.NOTSET)
    
    if request.POST:
        form = ScientificWorkForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            form = ScientificWorkForm(initial={'employee_id': request.user.employee})
            message = "Laporan berhasil dibuat"
            context = {
                'form': form,
                'msg': message
            }
        
            return render(request, 'laporan-ilmiah.html', context)
        
        else:
            print(form.errors)
        
    else:
        form = ScientificWorkForm(initial={'employee_id': request.user.employee})
        context = {'form': form}
        return render(request, 'laporan-ilmiah.html', context)
    
@login_required
def innovative_work_report(request):
    logging.basicConfig(level=logging.NOTSET)
    
    if request.POST:
        form = InnovativeWorkForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            form = InnovativeWorkForm(initial={'employee_id': request.user.employee})
            message = "Laporan berhasil dibuat"
            context = {
                'form': form,
                'msg': message
            }
        
            return render(request, 'laporan-karya.html', context)
        
        else:
            print(form.errors)
        
    else:
        form = InnovativeWorkForm(initial={'employee_id': request.user.employee})
        context = {'form': form}
        return render(request, 'laporan-karya.html', context)
    
@login_required
def human_development_report(request):
    logging.basicConfig(level=logging.NOTSET)
    
    if request.POST:
        form = HumanDevelopmentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            form = HumanDevelopmentForm(initial={'employee_id': request.user.employee})
            message = "Laporan berhasil dibuat"
            context = {
                'form': form,
                'msg': message
            }
        
            return render(request, 'laporan-pengembangan.html', context)
        
        else:
            print(form.errors)
        
    else:
        # form = HumanDevelopmentForm(initial={'employee_id': request.user.employee})
        # context = {'form': form}
        # return render(request, 'laporan-karya.html', context)
        return render(request, 'laporan-pengembangan.html')
    
@login_required
def duty_report(request):
    logging.basicConfig(level=logging.NOTSET)
    
    if request.POST:
        form = DutyForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            form = DutyForm(initial={'employee_id': request.user.employee})
            message = "Laporan berhasil dibuat"
            context = {
                'form': form,
                'msg': message
            }
        
            return render(request, 'laporan-tugas.html', context)
        
        else:
            print(form.errors)
        
    else:
        form = DutyForm(initial={'employee_id': request.user.employee})
        context = {'form': form}
        return render(request, 'laporan-tugas.html', context)
