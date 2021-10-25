from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

def add_user(request):
    if request.POST:
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "User berhasil dibuat")
            return redirect('add-user')
        else:
            messages.error(request, "Terjadi kesalahan")
            return redirect('add-user')
    
    else:
        form = UserCreationForm()
        context  ={
            'form': form,
        }
        
    return render(request, 'add-user.html', context)
