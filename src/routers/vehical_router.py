from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database_connection import get_db
from src.models.vehical_insurance import VehicleInsurance
from src.schemas.vehical_insurance import VehicleInsuranceCreate, VehicleInsuranceResponse
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicle"]
)

# CREATE
@router.post("/", response_model=VehicleInsuranceResponse)
def create_vehicle(data: VehicleInsuranceCreate, db: Session = Depends(get_db)):
    vehicle = VehicleInsurance(**data.model_dump())
    try:
        db.add(vehicle)
        db.commit()
        db.refresh(vehicle)
        return vehicle

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Registration number or Policy number already exists"
        )

# READ ALL
@router.get("/", response_model=list[VehicleInsuranceResponse])
def get_all_vehicles(db: Session = Depends(get_db)):
    return db.query(VehicleInsurance).all()

@router.get("/total-vehicles")
def get_total_vehicles(db: Session = Depends(get_db)):
    total = db.query(VehicleInsurance).count()
    return {"total_vehicles": total}

# READ BY REG NO
@router.get("/{reg_no}", response_model=VehicleInsuranceResponse)
def get_vehicle_by_reg_no(reg_no: str, db: Session = Depends(get_db)):
    vehicle = db.query(VehicleInsurance).filter(
        VehicleInsurance.reg_no == reg_no
    ).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

from src.schemas.vehical_insurance import VehicleInsuranceUpdate


@router.patch("/{reg_no}", response_model=VehicleInsuranceResponse)
def partial_update_vehicle(
    reg_no: str,
    data: VehicleInsuranceUpdate,
    db: Session = Depends(get_db)
):

    vehicle = db.query(VehicleInsurance).filter(
        VehicleInsurance.reg_no == reg_no
    ).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    update_data = data.model_dump(exclude_unset=True)

    # 👉 Only update provided fields
    for key, value in update_data.items():
        setattr(vehicle, key, value)

    db.commit()
    db.refresh(vehicle)

    return vehicle
