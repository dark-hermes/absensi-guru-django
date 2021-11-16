from absen.models import *

def reset_records():
    checkin_records = CheckinRecord.objects.exclude(is_checked=True)
    checkout_records = CheckoutRecord.objects.exclude(is_checked=True)

    for checkin_record in checkin_records:
        checkin_record.is_checked = False
        checkin_record.save()
        
    for checkout_record in checkout_records:
        checkout_record.is_checked = False
        checkout_record.save()
        