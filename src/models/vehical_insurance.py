from sqlalchemy import Column, Integer, String, Date
from config.database_connection import Base

class VehicleInsurance(Base):
    __tablename__ = "vehicle_insurance"

    id = Column(Integer, primary_key=True, index=True)
    sl_no = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    reg_no = Column(String, nullable=False, unique=True)
    policy_no = Column(String, nullable=False)

    insurance_expiry_date = Column(Date)
    permit_expiry_date = Column(Date)
    permit_authorization_date = Column(Date)
    fitness_expiry_date = Column(Date)
    puc_expiry_date = Column(Date)
    cng_leakage_test = Column(Date)
    tax_receipt_validity_date = Column(Date)
    road_tax_mv_tax = Column(Date)

    driver_dl_no = Column(String)
    driver_name = Column(String)
    dl_no = Column(String)
    dl_expiry_date = Column(Date)

    claim = Column(String)  # YES / NO
    rc_valid_till_date = Column(Date)
