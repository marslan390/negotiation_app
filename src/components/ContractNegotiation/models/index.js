import {EmployeeModel} from '../components/Employee/models'
import {EmployerModel} from '../components/Employer/models'

export class ContractNegotiationModel {
    employee = new EmployeeModel();
    employer = new EmployerModel();
}
