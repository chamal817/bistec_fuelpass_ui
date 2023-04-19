import { useState, useEffect } from 'react'
import { getVehicle, getAvailableQuota, fulling } from './api/vehicleService'


export function Fueling() {
    const [formData, setFormData] = useState({
        vehicleNumber: '',
    });
    const [fuelAmountForm, setFuelAmountForm] = useState({
        fuelAmount: '',
    });
    const [errors, setErrors] = useState({});
    const [availableQuota, setAvailableQuota] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isError, setIsError] = useState(false);


    //Form validation
    const validateForm = () => {
        let errors = {};
        if (!formData.vehicleNumber.trim()) {
            errors.vehicleNumber = 'Vehicle Number is required';
        }
        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            getVehicleDetail();

        } else {
            setErrors(errors);
        }
        createDate();

    }

    const validateAmountForm = () => {
        let errors = {};
        if (!fuelAmountForm.fuelAmount.trim()) {
            errors.fuelAmount = 'Fuel Amount is required';
        }
        if (parseInt(fuelAmountForm.fuelAmount, 10) >= +availableQuota) {
            errors.fuelAmount = 'Enter Valid Amount';
        }


        return errors;
    }

    const handleSubmitAmount = (event) => {
        event.preventDefault();
        const errors = validateAmountForm();
        if (Object.keys(errors).length === 0) {
            saveFuelAmount();
        } else {
            setErrors(errors);
        }

    }

    //Getting vehicle details from number
    async function getVehicleDetail() {
        const response = await getVehicle(formData.vehicleNumber);
        if (response.result.length) {
            localStorage.setItem('vid', response.result[0].id);
            createDate(response.result[0].vehicleType);
            setIsError(false);
        } else {
            setIsShow(false);
            setIsError(true);

        }

    }

    //set week starting date and end date
    function createDate(vehicleTypeId) {
        var currentDate = new Date;
        var first = currentDate.getDate() - currentDate.getDay();
        var last = first + 6;

        var firstDay = new Date(currentDate.setDate(first));
        var lastDay = new Date(currentDate.setDate(last));

        var formattedFirstDay = firstDay.toISOString().slice(0, 10);
        var formattedLastDay = lastDay.toISOString().slice(0, 10);
        var vehicleId = localStorage.getItem('vid');
        checkAvailableQuota(formattedFirstDay, formattedLastDay, vehicleId, vehicleTypeId);

    }

    //Check available Qty
    async function checkAvailableQuota(startDate, endDate, vehicleId, vehicleTypeId) {
        const response = await getAvailableQuota(startDate, endDate, vehicleId, vehicleTypeId);
        setIsShow(true)
        setAvailableQuota(response)
    }

    //Save fuel amount
    function saveFuelAmount() {
        var currentDate = new Date;
        var vehicleId = localStorage.getItem('vid');
        var date = currentDate.toISOString().slice(0, 10);
        var data = {
            "vehicleId": vehicleId,
            "fuelqty": fuelAmountForm.fuelAmount,
            "date": date
        }
        const response = fulling(data);
        if (response) {
            setFormData({
                vehicleNumber: '',

            });
            setFuelAmountForm({
                fuelAmount: '',

            });
            setIsShow(false)
            setAvailableQuota('')
        }

    }
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const amountHandleChange = (event) => {
        setFuelAmountForm({ ...fuelAmountForm, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 mt-5">
                    <div className="card text-center">
                        <div className="card-header">
                            Fulling
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-2">
                                        <label className="col-form-label">Vehicle Number</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} className="form-control" />
                                        {errors.vehicleNumber && <span>{errors.vehicleNumber}</span>}
                                    </div>
                                    <div className="col-md-3">
                                        <span className="form-text">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </span>
                                    </div>
                                </div>

                            </form>
                            {isShow && (
                                <form onSubmit={handleSubmitAmount}>
                                    <div><h5>Available Quota :  {availableQuota}L</h5></div>
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-2">
                                            <label className="col-form-label">Fuel Amount</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" name="fuelAmount" value={fuelAmountForm.fuelAmount} onChange={amountHandleChange} className="form-control" />
                                            {errors.fuelAmount && <span>{errors.fuelAmount}</span>}
                                        </div>
                                        <div className="col-md-3">
                                            <span className="form-text">
                                                <button type="submit" className="btn btn-primary">OK</button>

                                            </span>
                                        </div>
                                    </div>

                                </form>)}

                            {isError && <div className="alert alert-warning" role="alert">
                                Please Enter Valid Number
                            </div>}
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )

}

export default Fueling