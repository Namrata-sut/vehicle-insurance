from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database_connection import get_db
from src.models.vehical_insurance import VehicleInsurance

router = APIRouter(
    prefix="/vehicle-insurance",
    tags=["Vehicle Insurance"]
)

from datetime import date

def get_expired_records(db, column):
    today = date.today()

    vehicles = db.query(VehicleInsurance).filter(
        column < today
    ).all()

    result = []

    for v in vehicles:
        result.append({
            "id": v.id,
            "sl_no": v.sl_no,
            "name": v.name,
            "reg_no": v.reg_no,
            "policy_no": v.policy_no,

            "insurance_expiry_date": v.insurance_expiry_date,
            "permit_expiry_date": v.permit_expiry_date,
            "permit_authorization_date": v.permit_authorization_date,
            "fitness_expiry_date": v.fitness_expiry_date,
            "puc_expiry_date": v.puc_expiry_date,
            "cng_leakage_test": v.cng_leakage_test,
            "tax_receipt_validity_date": v.tax_receipt_validity_date,
            "road_tax_mv_tax": v.road_tax_mv_tax,

            "driver_dl_no": v.driver_dl_no,
            "driver_name": v.driver_name,
            "dl_no": v.dl_no,
            "dl_expiry_date": v.dl_expiry_date,

            "claim": v.claim,
            "rc_valid_till_date": v.rc_valid_till_date
        })

    return {
        "count": len(result),
        "vehicles": result
    }

# 1. TOTAL INSURANCE EXPIRED
@router.get("/expired/insurance")
def total_insurance_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.insurance_expiry_date)

# 2. TOTAL PERMIT EXPIRED
@router.get("/expired/permit")
def total_permit_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.permit_expiry_date)

# 3. TOTAL PERMIT AUTHORIZATION EXPIRED
@router.get("/expired/permit-authorization")
def total_permit_authorization_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.permit_authorization_date)

# 4. TOTAL FITNESS EXPIRED
@router.get("/expired/fitness")
def total_fitness_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.fitness_expiry_date)

# 5. TOTAL ROAD TAX / MV TAX EXPIRED
@router.get("/expired/road-tax")
def total_road_tax_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.road_tax_mv_tax)

# 6. TOTAL PUC EXPIRED
@router.get("/expired/puc")
def total_puc_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.puc_expiry_date)

# 7. TOTAL CNG LEAKAGE TEST EXPIRED
@router.get("/expired/cng")
def total_cng_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.cng_leakage_test)

# 8. TOTAL DRIVER DL EXPIRED
@router.get("/expired/dl")
def total_driver_dl_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.dl_expiry_date)

# 9. TOTAL TAX RECEIPT VALIDITY EXPIRED
@router.get("/expired/tax-receipt")
def total_tax_receipt_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.tax_receipt_validity_date)

# 10. TOTAL RC EXPIRED
@router.get("/expired/rc")
def total_rc_expired(db: Session = Depends(get_db)):
    return get_expired_records(db, VehicleInsurance.rc_valid_till_date)

