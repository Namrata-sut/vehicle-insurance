from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database_connection import get_db
from src.models.vehical_insurance import VehicleInsurance

router = APIRouter(
    prefix="/insurance-docs",
    tags=["Insurance Documents"]
)

@router.get("/total-of-docs-tracked")
def total_docs_tracked(db: Session = Depends(get_db)):

    vehicle_count = db.query(VehicleInsurance).count()

    docs_per_vehicle = 10

    return {
        "total_documents_tracked": vehicle_count * docs_per_vehicle,
        "vehicle_count": vehicle_count,
        "docs_per_vehicle": docs_per_vehicle
    }

@router.get("/total-valid-docs")
def total_valid_documents(db: Session = Depends(get_db)):

    today = date.today()
    total_ok = 0

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = [
            v.insurance_expiry_date,
            v.permit_expiry_date,
            v.permit_authorization_date,
            v.fitness_expiry_date,
            v.puc_expiry_date,
            v.cng_leakage_test,
            v.tax_receipt_validity_date,
            v.road_tax_mv_tax,
            v.dl_expiry_date,
            v.rc_valid_till_date
        ]

        for d in all_dates:
            if d and d >= today:
                total_ok += 1

    return {
        "total_valid_documents": total_ok
    }

@router.get("/total-expired-docs")
def total_expired_documents(db: Session = Depends(get_db)):

    today = date.today()
    total_expired = 0

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = [
            v.insurance_expiry_date,
            v.permit_expiry_date,
            v.permit_authorization_date,
            v.fitness_expiry_date,
            v.puc_expiry_date,
            v.cng_leakage_test,
            v.tax_receipt_validity_date,
            v.road_tax_mv_tax,
            v.dl_expiry_date,
            v.rc_valid_till_date
        ]

        for d in all_dates:
            if d and d < today:
                total_expired += 1

    return {
        "total_expired_documents": total_expired
    }

@router.get("/expiring-in-7-days")
def expiring_in_7_days(db: Session = Depends(get_db)):

    today = date.today()
    next_7 = today + timedelta(days=7)

    total_expiring = 0

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = [
            v.insurance_expiry_date,
            v.permit_expiry_date,
            v.permit_authorization_date,
            v.fitness_expiry_date,
            v.puc_expiry_date,
            v.cng_leakage_test,
            v.tax_receipt_validity_date,
            v.road_tax_mv_tax,
            v.dl_expiry_date,
            v.rc_valid_till_date
        ]

        for d in all_dates:
            if d and today <= d <= next_7:
                total_expiring += 1

    return {
        "expiring_in_7_days": total_expiring
    }

@router.get("/expiring-in-30-days")
def expiring_in_30_days(db: Session = Depends(get_db)):

    today = date.today()
    next_30 = today + timedelta(days=30)

    total_expiring = 0

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = [
            v.insurance_expiry_date,
            v.permit_expiry_date,
            v.permit_authorization_date,
            v.fitness_expiry_date,
            v.puc_expiry_date,
            v.cng_leakage_test,
            v.tax_receipt_validity_date,
            v.road_tax_mv_tax,
            v.dl_expiry_date,
            v.rc_valid_till_date
        ]

        for d in all_dates:
            if d and today <= d <= next_30:
                total_expiring += 1

    return {
        "expiring_in_30_days": total_expiring
    }

@router.get("/active-claims")
def active_claims(db: Session = Depends(get_db)):

    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.claim == "YES"
    ).count()

    return {
        "active_claims": count
    }
