from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database_connection import get_db
from src.models.vehical_insurance import VehicleInsurance

router = APIRouter(
    prefix="/vehicle-insurance",
    tags=["Vehicle Insurance"]
)

# 1. TOTAL INSURANCE EXPIRED
@router.get("/expired/insurance")
def total_insurance_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.insurance_expiry_date < today
    ).count()
    return {"total_insurance_expired": count}

# 2. TOTAL PERMIT EXPIRED
@router.get("/expired/permit")
def total_permit_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.permit_expiry_date < today
    ).count()
    return {"total_permit_expired": count}

# 3. TOTAL PERMIT AUTHORIZATION EXPIRED
@router.get("/expired/permit-authorization")
def total_permit_authorization_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.permit_authorization_date < today
    ).count()
    return {"total_permit_authorization_expired": count}

# 4. TOTAL FITNESS EXPIRED
@router.get("/expired/fitness")
def total_fitness_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.fitness_expiry_date < today
    ).count()
    return {"total_fitness_expired": count}

# 5. TOTAL ROAD TAX / MV TAX EXPIRED
@router.get("/expired/road-tax")
def total_road_tax_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.road_tax_mv_tax < today
    ).count()
    return {"total_road_tax_expired": count}

# 6. TOTAL PUC EXPIRED
@router.get("/expired/puc")
def total_puc_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.puc_expiry_date < today
    ).count()
    return {"total_puc_expired": count}

# 7. TOTAL CNG LEAKAGE TEST EXPIRED
@router.get("/expired/cng")
def total_cng_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.cng_leakage_test < today
    ).count()
    return {"total_cng_leakage_test_expired": count}

# 8. TOTAL DRIVER DL EXPIRED
@router.get("/expired/dl")
def total_driver_dl_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.dl_expiry_date < today
    ).count()
    return {"total_driver_dl_expired": count}

# 9. TOTAL TAX RECEIPT VALIDITY EXPIRED
@router.get("/expired/tax-receipt")
def total_tax_receipt_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.tax_receipt_validity_date < today
    ).count()
    return {"total_tax_receipt_expired": count}

# 10. TOTAL RC EXPIRED
@router.get("/expired/rc")
def total_rc_expired(db: Session = Depends(get_db)):
    today = date.today()
    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.rc_valid_till_date < today
    ).count()
    return {"total_rc_expired": count}
