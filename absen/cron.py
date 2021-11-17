from absen.models import *
from userauth.models import *
from django.utils import timezone

def reset_records():
    checkin_records = CheckinRecord.objects.filter(is_checked=True)
    checkout_records = CheckoutRecord.objects.filter(is_checked=True)

    for checkin_record in checkin_records:
        checkin_record.is_checked = False
        checkin_record.save(update_fields=['is_checked'])
        
    for checkout_record in checkout_records:
        checkout_record.is_checked = False
        checkout_record.save(update_fields=['is_checked'])
        
        
def auto_fill_presence():
    now_date = timezone.now()
    today = now_date.strftime('%A').lower()
    user_list = Employee.objects.all()
    
    for user_id in user_list:
        work_days = Days.objects.get(employee_id=user_id)
        
        exec(f"""if work_days.{today} == True:
            empty_presence = Presence(employee_id=user_id,presence_date=now_date.strftime('%Y-%m-%d'))
            empty_presence.save()""")
        
        