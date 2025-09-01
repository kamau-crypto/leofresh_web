import type {
	CancelMaterialRequestDTO,
	CreateMaterialRequestDTO,
	DeleteMaterialRequestDTO,
	ListMaterialRequestDTO,
	ResendMaterialRequestDTO,
	SingleMaterialRequestDTO,
	SubmitMaterialRequestDTO,
} from "@/data-access/dto";
import type {
	ReadMultipleMaterialRequestsModel,
	SingleMaterialRequestDataModel,
} from "@/data-access/models";

/**
 * 
 * export const materialRequestFields: string[] = [
	"name",
	"set_from_warehouse as from_warehouse",
	"material_request_type",
	"set_warehouse",
	"status",
	"per_ordered",
	"transaction_date",
	"items",
	"creation",
];
 */
export interface IMaterialRequest {
	getMaterialRequests: () => Promise<ReadMultipleMaterialRequestsModel[]>;
	getMaterialRequest: (
		dto: SingleMaterialRequestDTO
	) => Promise<SingleMaterialRequestDataModel>;
	resendRequest: (resend: ResendMaterialRequestDTO) => Promise<any>;
	cancelRequest: (cancel: CancelMaterialRequestDTO) => Promise<any>;
	deleteMaterialRequest: (id: DeleteMaterialRequestDTO) => Promise<any>;
	createMaterialRequest: (data: CreateMaterialRequestDTO) => Promise<any>;
	submitMaterialRequest: (data: SubmitMaterialRequestDTO) => Promise<any>;
}

export class MaterialRequestRepository implements IMaterialRequest {
	getMaterialRequests = async (list: ListMaterialRequestDTO) => {
		return await MaterialRequest.find();
	};

	getMaterialRequest = async (dto: SingleMaterialRequestDTO) => {
		return await MaterialRequest.findById(dto.material_req);
	};

	resendRequest = async (resend: ResendMaterialRequestDTO) => {
		return await MaterialRequest.findByIdAndUpdate(resend.name, {
			status: "resend",
		});
	};

	cancelRequest = async (cancel: CancelMaterialRequestDTO) => {
		return await MaterialRequest.findByIdAndUpdate(cancel.name, {
			status: "cancelled",
		});
	};

	deleteMaterialRequest = async (id: DeleteMaterialRequestDTO) => {
		return await MaterialRequest.findByIdAndDelete(id.name);
	};

	createMaterialRequest = async (data: CreateMaterialRequestDTO) => {
		return await MaterialRequest.create(data);
	};

	submitMaterialRequest = async (data: SubmitMaterialRequestDTO) => {
		return await MaterialRequest.findByIdAndUpdate(data.name, {
			status: "submitted",
		});
	};
}
