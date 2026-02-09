from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database_connection import get_db
from src.models.vehical_insurance import VehicleInsurance

router = APIRouter(
    prefix="/insurance-docs",
    tags=["Insurance Documents"]
)

@router.get("/count_total_docs")
def count_total_documents(db: Session = Depends(get_db)):

    vehicles = db.query(VehicleInsurance).all()

    total_docs = 0

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

        # 👉 count every document even if null
        total_docs += len(all_dates)

    return {
        "total_documents_tracked": total_docs
    }

@router.get("/count-valid")
def count_valid_documents(db: Session = Depends(get_db)):

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

    return {"total_valid_documents": total_ok}

@router.get("/count-expired")
def count_expired_documents(db: Session = Depends(get_db)):

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

    return {"total_expired_documents": total_expired}

@router.get("/count-7-days")
def count_expiring_7_days(db: Session = Depends(get_db)):

    today = date.today()
    next_7 = today + timedelta(days=7)

    total = 0

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
                total += 1

    return {"expiring_in_7_days": total}

@router.get("/count-30-days")
def count_expiring_30_days(db: Session = Depends(get_db)):

    today = date.today()
    next_30 = today + timedelta(days=30)

    total = 0

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
                total += 1

    return {"expiring_in_30_days": total}

@router.get("/count-claims")
def count_active_claims(db: Session = Depends(get_db)):

    count = db.query(VehicleInsurance).filter(
        VehicleInsurance.claim == "YES"
    ).count()

    return {"active_claims_count": count}

@router.get("/total-valid-docs")
def total_valid_documents(db: Session = Depends(get_db)):

    today = date.today()
    total_ok = 0
    result = []

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = {
            "insurance_expiry_date": v.insurance_expiry_date,
            "permit_expiry_date": v.permit_expiry_date,
            "permit_authorization_date": v.permit_authorization_date,
            "fitness_expiry_date": v.fitness_expiry_date,
            "puc_expiry_date": v.puc_expiry_date,
            "cng_leakage_test": v.cng_leakage_test,
            "tax_receipt_validity_date": v.tax_receipt_validity_date,
            "road_tax_mv_tax": v.road_tax_mv_tax,
            "dl_expiry_date": v.dl_expiry_date,
            "rc_valid_till_date": v.rc_valid_till_date
        }

        valid_docs = []

        for name, d in all_dates.items():
            if d and d >= today:
                total_ok += 1
                valid_docs.append(name)

        result.append({
            "id": v.id,
            "sl_no": v.sl_no,
            "company_name": v.company_name,
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
            "rc_valid_till_date": v.rc_valid_till_date,

            "valid_documents": valid_docs,
            "valid_count": len(valid_docs)
        })

    return {
        "total_valid_documents": total_ok,
        "vehicles": result
    }

@router.get("/total-expired-docs")
def total_expired_documents(db: Session = Depends(get_db)):

    today = date.today()
    total_expired = 0
    result = []

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = {
            "insurance_expiry_date": v.insurance_expiry_date,
            "permit_expiry_date": v.permit_expiry_date,
            "permit_authorization_date": v.permit_authorization_date,
            "fitness_expiry_date": v.fitness_expiry_date,
            "puc_expiry_date": v.puc_expiry_date,
            "cng_leakage_test": v.cng_leakage_test,
            "tax_receipt_validity_date": v.tax_receipt_validity_date,
            "road_tax_mv_tax": v.road_tax_mv_tax,
            "dl_expiry_date": v.dl_expiry_date,
            "rc_valid_till_date": v.rc_valid_till_date
        }

        expired_docs = []

        for name, d in all_dates.items():
            if d and d < today:
                total_expired += 1
                expired_docs.append(name)

        # Add vehicle ONLY IF it has expired docs
        if len(expired_docs) > 0:

            result.append({
                "sl_no": v.sl_no,
                "name": v.name,
                "company_name": v.company_name,
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
                "rc_valid_till_date": v.rc_valid_till_date,

                "expired_documents": expired_docs,
                "expired_count": len(expired_docs)
            })

    return {
        "total_expired_documents": total_expired,
        "vehicles": result
    }

@router.get("/expiring-in-7-days")
def expiring_in_7_days(db: Session = Depends(get_db)):

    today = date.today()
    next_7 = today + timedelta(days=7)

    total_expiring = 0
    result = []

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = {
            "insurance_expiry_date": v.insurance_expiry_date,
            "permit_expiry_date": v.permit_expiry_date,
            "permit_authorization_date": v.permit_authorization_date,
            "fitness_expiry_date": v.fitness_expiry_date,
            "puc_expiry_date": v.puc_expiry_date,
            "cng_leakage_test": v.cng_leakage_test,
            "tax_receipt_validity_date": v.tax_receipt_validity_date,
            "road_tax_mv_tax": v.road_tax_mv_tax,
            "dl_expiry_date": v.dl_expiry_date,
            "rc_valid_till_date": v.rc_valid_till_date
        }

        expiring_docs = []

        for name, d in all_dates.items():
            if d and today <= d <= next_7:
                total_expiring += 1
                expiring_docs.append(name)

        if expiring_docs:
            result.append({
                "id": v.id,
                "sl_no": v.sl_no,
                "name": v.name,
                "company_name": v.company_name,
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
                "rc_valid_till_date": v.rc_valid_till_date,

                "expiring_documents": expiring_docs,
                "expiring_count": len(expiring_docs)
            })

    return {
        "expiring_in_7_days": total_expiring,
        "vehicles": result
    }

@router.get("/expiring-in-15-days")
def expiring_in_15_days(db: Session = Depends(get_db)):

    today = date.today()
    next_15 = today + timedelta(days=15)

    total_expiring = 0
    result = []

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = {
            "insurance_expiry_date": v.insurance_expiry_date,
            "permit_expiry_date": v.permit_expiry_date,
            "permit_authorization_date": v.permit_authorization_date,
            "fitness_expiry_date": v.fitness_expiry_date,
            "puc_expiry_date": v.puc_expiry_date,
            "cng_leakage_test": v.cng_leakage_test,
            "tax_receipt_validity_date": v.tax_receipt_validity_date,
            "road_tax_mv_tax": v.road_tax_mv_tax,
            "dl_expiry_date": v.dl_expiry_date,
            "rc_valid_till_date": v.rc_valid_till_date
        }

        expiring_docs = []

        for name, d in all_dates.items():
            if d and today <= d <= next_15:
                total_expiring += 1
                expiring_docs.append(name)

        if expiring_docs:
            result.append({
                "id": v.id,
                "sl_no": v.sl_no,
                "name": v.name,
                "company_name": v.company_name,
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
                "rc_valid_till_date": v.rc_valid_till_date,

                "expiring_documents": expiring_docs,
                "expiring_count": len(expiring_docs)
            })

    return {
        "expiring_in_15_days": total_expiring,
        "vehicles": result
    }

@router.get("/expiring-in-30-days")
def expiring_in_30_days(db: Session = Depends(get_db)):

    today = date.today()
    next_30 = today + timedelta(days=30)

    total_expiring = 0
    result = []

    vehicles = db.query(VehicleInsurance).all()

    for v in vehicles:

        all_dates = {
            "insurance_expiry_date": v.insurance_expiry_date,
            "permit_expiry_date": v.permit_expiry_date,
            "permit_authorization_date": v.permit_authorization_date,
            "fitness_expiry_date": v.fitness_expiry_date,
            "puc_expiry_date": v.puc_expiry_date,
            "cng_leakage_test": v.cng_leakage_test,
            "tax_receipt_validity_date": v.tax_receipt_validity_date,
            "road_tax_mv_tax": v.road_tax_mv_tax,
            "dl_expiry_date": v.dl_expiry_date,
            "rc_valid_till_date": v.rc_valid_till_date
        }

        expiring_docs = []

        for name, d in all_dates.items():
            if d and today <= d <= next_30:
                total_expiring += 1
                expiring_docs.append(name)

        if expiring_docs:
            result.append({
                "id": v.id,
                "sl_no": v.sl_no,
                "name": v.name,
                "company_name": v.company_name,
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
                "rc_valid_till_date": v.rc_valid_till_date,

                "expiring_documents": expiring_docs,
                "expiring_count": len(expiring_docs)
            })

    return {
        "expiring_in_30_days": total_expiring,
        "vehicles": result
    }

@router.get("/active-claims")
def active_claims(db: Session = Depends(get_db)):

    vehicles = db.query(VehicleInsurance).filter(
        VehicleInsurance.claim == "YES"
    ).all()

    result = []

    for v in vehicles:
        result.append({
            "id": v.id,
            "sl_no": v.sl_no,
            "name": v.name,
            "company_name": v.company_name,
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
        "active_claims_count": len(result),
        "vehicles": result
    }
