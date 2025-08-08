interface Device {
    type: string;
    brand: string;
    model: string;
    serialNumber: string;
    purchaseDate: Date;
    warrantyEndDate: Date;
    isActive: boolean;
    lastServicedDate?: Date;
    notes?: string;
}

const remoteWorkerMachine: Device= {
    type:"Laptop",
    brand:"HP",
    model:"EliteBook 840",
    serialNumber:"SN123456789",
    purchaseDate:new Date("2022-9-15"),
    warrantyEndDate:new Date("2025-09-15"),
    isActive:false,
    lastServicedDate:new Date("2023-05-01"),
    notes:"piv card reset required, returned by user"
};

const remoteWorkerComs:Device={
    type:"Cellphone",
    brand:"Apple",
    model:"iPhone 13",
    serialNumber:"SN987654321",
    purchaseDate:new Date("2021-11-20"),
    warrantyEndDate:new Date("2024-11-20"),
    isActive:false,
    lastServicedDate:new Date("2023-08-10"),
    notes:"device reset, returned by user"
};

const onsiteMachine: Device = {
    type: "Laptop",
    brand: "IBM",
    model: "ThinkPad X1",
    serialNumber: "SN1122334455",
    purchaseDate: new Date("2022-01-10"),
    warrantyEndDate: new Date("2025-01-10"),
    isActive: true,
    lastServicedDate: new Date("2023-02-15"),
    notes: "device in good condition, located in HQ"
};

console.log("Remote Worker Machine:", remoteWorkerMachine);
console.log();
onsiteMachine.notes="device upgraded to Windows 11, ready for use";
console.log("Onsite Machine:", onsiteMachine);
console.log();
console.log("Remote Worker Communications Device:", remoteWorkerComs);