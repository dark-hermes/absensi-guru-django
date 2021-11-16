from django.shortcuts import render
from laporan.forms import *
import logging
from django.views.decorators.csrf import csrf_exempt
from laporan.models import Method, SubjectName, SubjectCategory
from django.contrib.auth.decorators import login_required

@login_required
def study_report(request):
    logging.basicConfig(level=logging.NOTSET)
    if request.POST:
        form = StudyForm(request.POST, request.FILES)
        if form.is_valid():
            subject_name_obj = SubjectName.objects.filter(id=request.POST.get('subject_name'))[0]
            subject_category_obj = SubjectCategory.objects.filter(id=request.POST.get('subject_category'))[0]
            
            saved_form = form.save(commit=False)
            saved_form.subject_category = subject_category_obj
            saved_form.subject_name = subject_name_obj
            saved_form.method = ','.join(request.POST.getlist('method'))
            saved_form.save()
            
            form = StudyForm(initial={'employee_id': request.user.employee})
            method_list = Method.objects.values_list('method_name', flat=True)
            message = "Laporan berhasil dibuat"
            context = {
                'form': form,
                'msg': message,
                'method_list': method_list
            }
    
            return render(request, 'laporan-belajar.html', context)
        else:
            print(form.errors)
        
    else:
        form = StudyForm(initial={'employee_id': request.user.employee})
        method_list = Method.objects.all()

        context = {'form': form, 'method_list': method_list}

        return render(request, 'laporan-belajar.html', context)

@login_required
def guidance_report(request):
    logging.basicConfig(level=logging.NOTSET)
    
    if request.POST:
        form = GuidanceForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            form = GuidanceForm(initial={'employee_id': request.user.employee})
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
            saved_form = form.save(commit=False)
            saved_form.activity = request.POST.get('activity')
            saved_form.role = request.POST.get('role')
            saved_form.held_on = request.POST.get('held_on')
            saved_form.save()
            
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
        form = HumanDevelopmentForm(initial={'employee_id': request.user.employee})
        context = {'form': form}
        return render(request, 'laporan-pengembangan.html', context)
        
    
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

@login_required
def show_study_report(request):
    return render(request, 'tampil_laporan-belajar.html', { "id": request.user.id} )    
    
@login_required
def show_guidance_report(request):
    return render(request, 'tampil_laporan-bimbingan.html', { "id": request.user.id} )

@login_required
def show_scientific_work_report(request):
    return render(request, 'tampil_laporan-ilmiah.html', { "id": request.user.id} )

@login_required
def show_innovative_work_report(request):
    return render(request, 'tampil_laporan-karya.html', { "id": request.user.id} )

@login_required
def show_human_development_report(request):
    return render(request, 'tampil_laporan-pengemabangan.html', { "id": request.user.id} )

@login_required
def show_duty_report(request):
    return render(request, 'tampil_laporan-tugas.html', { "id": request.user.id} )
