from pydantic import BaseModel
from datetime import date

class VehicleInsuranceCreate(BaseModel):
    sl_no: int
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
