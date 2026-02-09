from typing import Optional

from pydantic import BaseModel
from datetime import date

class VehicleInsuranceCreate(BaseModel):
    sl_no: int
    company_name: str
    name: str
    reg_no: str
    policy_no: str

    insurance_expiry_date: date
    permit_expiry_date: date
    permit_authorization_date: date
    fitness_expiry_date: date
    puc_expiry_date: date
    cng_leakage_test: date
    tax_receipt_validity_date: date
    road_tax_mv_tax: date

    driver_dl_no: str
    driver_name: str
    dl_no: str
    dl_expiry_date: date

    claim: str
    rc_valid_till_date: date


class VehicleInsuranceResponse(VehicleInsuranceCreate):
    id: int

    class Config:
        from_attributes = True

class VehicleInsuranceUpdate(BaseModel):

    sl_no: Optional[int] = None
    name: Optional[str] = None
    company_name: Optional[str] = None
    reg_no: Optional[str] = None
    policy_no: Optional[str] = None

    insurance_expiry_date: Optional[date] = None
    permit_expiry_date: Optional[date] = None
    permit_authorization_date: Optional[date] = None
    fitness_expiry_date: Optional[date] = None
    puc_expiry_date: Optional[date] = None
    cng_leakage_test: Optional[date] = None
    tax_receipt_validity_date: Optional[date] = None
    road_tax_mv_tax: Optional[date] = None

    driver_dl_no: Optional[str] = None
    driver_name: Optional[str] = None
    dl_no: Optional[str] = None
    dl_expiry_date: Optional[date] = None

    claim: Optional[str] = None
    rc_valid_till_date: Optional[date] = None

    class Config:
        orm_mode = True
