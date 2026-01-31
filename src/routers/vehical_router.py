from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database_connection import get_db
from src.models.vehical_insurance import VehicleInsurance
from src.schemas.vehical_insurance import VehicleInsuranceCreate, VehicleInsuranceResponse

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicle"]
)

# CREATE
@router.post("/", response_model=VehicleInsuranceResponse)
def create_vehicle(data: VehicleInsuranceCreate, db: Session = Depends(get_db)):
    vehicle = VehicleInsurance(**data.model_dump())
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle


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

