import { useState } from 'react'
import { registerVehicle } from './api/vehicleService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCar } from '@fortawesome/free-solid-svg-icons';

export function Register() {
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        chassisNumber: '',
        vehicleType: '',

    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);;

    const validateForm = () => {
        let errors = {};

        if (!formData.vehicleNumber.trim()) {
            errors.vehicleNumber = 'Vehicle Number is required';
        }
        if (!formData.chassisNumber.trim()) {
            errors.chassisNumber = 'Chassis Number is required';
        }

        if (formData.vehicleType == 0) {
            errors.vehicleType = 'Vehicle Type is required';
        }

        return errors;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            saveVehicle(formData);
            saveSuccess();
        } else {
            setErrors(errors);
        }

    }


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function saveVehicle(formData) {
        const response = registerVehicle(formData);
        if (response) {
            setFormData({
                vehicleNumber: '',
                chassisNumber: '',
                vehicleType: 0,
            });
        }

    }

    function saveSuccess() {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    }
    return (
        <div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 mt-5">
                    <div className="card text-center">
                        <div className="card-header d-flex justify-content-center">
                            <div className='icon-box me-2'> <FontAwesomeIcon icon={faCar} /></div>REGISTRATION
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className='d-flex justify-content-start'>Vehicle Number</label>
                                        <input type="text" className="form-control mt-1" onChange={handleChange} name="vehicleNumber" value={formData.vehicleNumber} placeholder="Vehicle Number" />
                                        {errors.vehicleNumber && <span className='error-message d-flex justify-content-start'>{errors.vehicleNumber}</span>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className='d-flex justify-content-start'>Vehicle Type</label>
                                        <select onChange={handleChange} name="vehicleType" value={formData.vehicleType} className="form-select mt-1">
                                            <option value={0}>Select Type</option>
                                            <option value={1}>Bike</option>
                                            <option value={2}>Car</option>
                                            <option value={3}>Bus</option>
                                            <option value={4}>Lorry</option>
                                            <option value={5}>Van</option>
                                            <option value={6}>Three Wheel</option>
                                        </select>
                                        {errors.vehicleType && <span className='error-message d-flex justify-content-start'>{errors.vehicleType}</span>}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className='d-flex justify-content-start'>Chassis Number</label>
                                        <input type="text" className="form-control mt-1" onChange={handleChange} value={formData.chassisNumber} name="chassisNumber" placeholder="Chassis Number" />
                                        {errors.chassisNumber && <span className='error-message d-flex justify-content-start'>{errors.chassisNumber}</span>}
                                    </div>
                                    <div className='col-md-4 mt-4'> <button type="submit" className="btn btn-primary d-flex justify-content-start">Submit</button></div>
                                </div>
                            </form>
                            {success &&
                                <div className="alert alert-success d-flex justify-content-center mt-2"><div className='icon-box me-2'><FontAwesomeIcon icon={faCheck} size="sm" /></div>Saved successfully</div>}
                        </div>
                    </div>
                </div></div>
        </div>
    );


}
export default Register