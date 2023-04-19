import API_URL from '../../config';

export async function registerVehicle(data) {
    const response = await fetch(`${API_URL}/vehicle/addvehicle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function getVehicle(data) {
    const response = await fetch(`${API_URL}/vehicle/checkVehicle/${data}`);
    return await response.json();
}

export async function getAvailableQuota(startDate, endDate, vehicleId,typeId) {
    if(vehicleId != undefined && typeId != undefined ){
        const response = await fetch(`${API_URL}/fuel/GetAvailableQty?startDate=${startDate}&endDate=${endDate}&vehicleId=${vehicleId}&typeId=${typeId}`);
        return await response.text();
    }

    
}
export async function fulling(data) {
    const response = await fetch(`${API_URL}/fuel/fuelQty`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}