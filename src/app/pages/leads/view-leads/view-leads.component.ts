import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { LeadsService } from "../leads.service";

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrls: ['./view-leads.component.scss']
})
export class ViewLeadsComponent implements OnInit {

  Id: string;
  Note: boolean = true;
  Email: boolean = false;
  Call: boolean = false;
  SMS: boolean = false;
  All: boolean = true;
  Notes: boolean = false;
  Call2: boolean = false;
  Notes2: boolean = false;
  Email2: boolean = false;
  ModalOpen: boolean;
  SMS2: boolean = false;
  whatsapp: boolean = false;
  whatsapp2: boolean = false;
  EmailForm: FormGroup;
  NotesForm: FormGroup;
  CallLogForm: FormGroup;
  SmsForm: FormGroup;
  WhatsappForm: FormGroup;
  htmlContent: any;
  userObj: any;
  UserId: any;
  company_Id: any;
  Emails: any;
  toemail: any;
  Noteslist: any;
  CallLogList: any;
  Emails1: any;
  LeadForm: FormGroup;
  Phone_type: string;
  Origin_Address: any;
  destination_Address: any;
  leads_Id: any;
  Leadsdetails: any;
  BranchList: any;
  NotesDetails: any;
  CallLogDetails: any;
  AllEmailDetails: any;
  user_Id: any;
  AllSMSDetails: any;
  AllWhatsapp: any;
  Full_Name: any;
  Company_Id: any;
  Branch_Id: any;
  constructor(
    private router: Router,
    private Route: ActivatedRoute,
    private config: Config,
    private fb: FormBuilder,
    private leadApi: LeadsService,
    private toastr: ToastrService
  ) {
    this.EmailForm = this.fb.group({
      email_Id: 0,
      leads_Id: 0,
      company_Id: 0,
      user_Id: 0,
      email_Date: "2022-10-12T06:39:41.974Z",
      email_Subject: "",
      email_Description: ""
    });
    this.NotesForm = this.fb.group({
      note_Id: 0,
      notes_Description: "",
      date: "2021-11-10T08:48:56.587Z",
      company_Id: 0,
      user_Id: 0,
      lead_Id: 0,
    });
    this.CallLogForm = this.fb.group({
      call_Id: 0,
      leads_Id: 0,
      company_Id: 0,
      user_Id: 0,
      call_Started: "2021-11-11T07:56:07.435Z",
      call_Ended: "2021-11-11T07:56:07.435Z",
      calls_Description: "",
      date: "2021-11-11T07:56:07.435Z",
    });
    this.SmsForm = this.fb.group({
      sms_Id: 0,
      leads_Id: 0,
      company_Id: 0,
      user_Id: 0,
      sms_Description: "",
      sms_Date: "2022-10-12T09:51:38.988Z"
    });
    this.WhatsappForm = this.fb.group({
      whatsapp_Id: 0,
      leads_Id: 0,
      company_Id: 0,
      user_Id: 0,
      whatsapp_Date: "2022-10-12T10:35:18.475Z",
      whatsapp_Massage: ""
    });
    this.LeadForm = this.fb.group({
      lead_Id: 0,
      name: "",
      mobile: "",
      email: "",
      address: "",
      remark: "",
      requirments: "",
      branch_Id: 0,
      company_Id: 0,
      dts: "2022-01-17T10:47:34.936Z",
    });
  }
  ngOnInit(): void {
    this.getBranchList();
    this.Id = this.Route.snapshot.paramMap.get("Id");
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.Company_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.company_Id;
    this.user_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.user_Id;
    this.Full_Name = JSON.parse(localStorage.getItem("userObj")).userInfo.full_Name;

    this.GellDatabyId(this.Id);
    this.allNotes(this.Id)
    this.allCallLog(this.Id)
    this.AllEmailsData(this.Id)
    this.AllSmsDetails(this.Id)
    this.AllWhatsappMsg(this.Id)
  }
  openTab1() {
    this.Note = true;
    this.Email = false;
    this.Call = false;
    this.SMS = false;
    this.whatsapp = false;
  }
  openTab2() {
    this.Note = false;
    this.Email = true;
    this.Call = false;
    this.SMS = false;
    this.whatsapp = false;
  }

  openTab3() {
    this.Note = false;
    this.Email = false;
    this.Call = true;
    this.SMS = false;
    this.whatsapp = false;
  }

  openTab4() {
    this.Note = false;
    this.Email = false;
    this.Call = false;
    this.SMS = true;
    this.whatsapp = false;
  }
  openTab5() {
    this.Note = false;
    this.Email = false;
    this.Call = false;
    this.SMS = false;
    this.whatsapp = true;
  }
  openTab6() {
    this.All = true;
    this.Notes2 = false;
    this.Email2 = false;
    this.Call2 = false;
    this.SMS2 = false;
    this.whatsapp2 = false;
  }
  openTab7() {
    this.All = false;
    this.Notes2 = true;
    this.Email2 = false;
    this.Call2 = false;
    this.SMS2 = false;
    this.whatsapp2 = false;
  }
  openTab8() {
    this.All = false;
    this.Notes2 = false;
    this.Email2 = true;
    this.Call2 = false;
    this.SMS2 = false;
    this.whatsapp2 = false;
  }
  openTab9() {
    this.All = false;
    this.Notes2 = false;
    this.Email2 = false;
    this.Call2 = true;
    this.SMS2 = false;
    this.whatsapp2 = false;
  }
  openTab10() {
    this.All = false;
    this.Notes2 = false;
    this.Email2 = false;
    this.Call2 = false;
    this.SMS2 = true;
    this.whatsapp2 = false;
  }

  openTab11() {
    this.All = false;
    this.Notes2 = false;
    this.Email2 = false;
    this.Call2 = false;
    this.SMS2 = false;
    this.whatsapp2 = true;
  }

  GellDatabyId(Id) {
    this.config.startLoader();
    this.leadApi.GetLeadsById(Id).subscribe((res) => {
      console.log(res);
      if (res.status == "1") {
        this.Leadsdetails = res.leads;
        console.log("Leadsdetails", this.Leadsdetails);
      } else {
        this.config.stopLoader();
      }
    });
  }

  Edit(Id) {
    this.loadRequestByIdlead(Id);
    this.ModalOpen = true;
  }

  loadRequestByIdlead(Id) {
    console.log("Id", Id);
    this.leadApi.GetLeadsById(Id).subscribe(
      (res) => {
        console.log("edit value", res);
        this.LeadForm.patchValue({
          name: res.leads.name,
          mobile: res.leads.mobile,
          address: res.leads.address,
          email: res.leads.email,
          remark: res.leads.remark,
          requirments: res.leads.requirments,
          branch_Id: res.leads.branch_Id
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getBranchList() {
    this.config.startLoader();
    this.leadApi.getBranchList().subscribe((res) => {
      this.BranchList = res.branch;
      this.config.stopLoader();
    });
  }

  saveleads() {
    if (this.LeadForm.value.lead_Id == null) {
      this.LeadForm.value.lead_Id = 0;
    } else {
      this.LeadForm.value.branch_Id = parseInt(this.LeadForm.value.branch_Id);
      this.LeadForm.value.company_Id = this.Company_Id;
      this.leadApi.saveLeads(this.LeadForm.value).subscribe((res) => {
        if (res.status == 1) {
          this.config.stopLoader();
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.router.navigate(["/Leads"]);
          this. Getall(this.Branch_Id)
          this.LeadForm.reset();
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      });
    }
  }
 
  Getall(Branch_Id) {
    console.log("Branch_Id", Branch_Id);
    this.config.startLoader();
    this.leadApi.GetAll(Branch_Id).subscribe((res) => {
      console.log("leads", res);
    });
  }

  close() {
    this.router.navigate(["/Leads"]);
  }

  closeNotesModal() {
    this.ModalOpen = false;
  }

  opencontract(lead_Id) {
    console.log("contract id ", lead_Id);
    this.router.navigate(["/Contract/" + lead_Id]);
  }

  saveNotes() {
    if (this.NotesForm.value.Notes_Id == null) {
      this.NotesForm.value.Notes_Id = 0;
    } else {
      this.NotesForm.value.leads_Id = parseInt(this.Id)
      this.NotesForm.value.company_Id = this.company_Id
      this.NotesForm.value.user_Id = this.user_Id
      this.NotesForm.value.full_Name = this.Full_Name
      this.leadApi.saveNotes(this.NotesForm.value).subscribe((res) => {
        console.log("NotesFormRes", res);
        if (res.status == 1) {
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.NotesForm.reset();
          this.allNotes(this.Id)
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      });
    }
  }

  allNotes(Id) {
    this.config.startLoader();
    this.leadApi.getNotesList(Id).subscribe((res) => {
      console.log("AllNotes", res);
        this.NotesDetails = res.notes
        this.saveNotes();
        this.config.stopLoader();
    });
  }



  saveCall() {
    if (this.CallLogForm.value.call_Id == null) {
      this.CallLogForm.value.call_Id = 0;
    } else {
      this.CallLogForm.value.leads_Id = parseInt(this.Id)
      this.CallLogForm.value.company_Id = this.company_Id
      this.CallLogForm.value.user_Id = this.user_Id
      this.CallLogForm.value.full_Name = this.Full_Name
      this.leadApi.getCallLog(this.CallLogForm.value).subscribe((res) => {
        console.log("CallFormRes", res);
        if (res.status == 1) {
          this.config.stopLoader();
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.CallLogForm.reset();
          this.allCallLog(this.Id)
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      });
    }
  }


  allCallLog(Id) {
    this.config.startLoader();
    this.leadApi.getAllCallLog(Id).subscribe((res) => {
        this.CallLogDetails = res.call;
        this.config.stopLoader();
    });
  }

  SaveEmails() {
    if (this.EmailForm.value.email_Id == null) {
      this.EmailForm.value.email_Id = 0;
    } else {
      this.EmailForm.value.leads_Id = parseInt(this.Id)
      this.EmailForm.value.company_Id = this.company_Id
      this.EmailForm.value.user_Id = this.user_Id
      this.EmailForm.value.full_Name = this.Full_Name
      this.leadApi.saveEmailData(this.EmailForm.value).subscribe((res) => {
        console.log("All Emails", res);
        if (res.status == 1) {
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.EmailForm.reset();
          this.AllEmailsData(this.Id)
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      });
    }
  }

  AllEmailsData(Id) {
    this.config.startLoader();
    this.leadApi.getAllEmails(Id).subscribe((res) => {
      console.log("All Emails Data", res);
        this.AllEmailDetails = res.emails;
        this.config.stopLoader();
    });
  }


  SaveSms() {
    if (this.SmsForm.value.sms_Id == null) {
      this.SmsForm.value.sms_Id = 0;
    } else {
      this.SmsForm.value.leads_Id = parseInt(this.Id)
      this.SmsForm.value.company_Id = this.company_Id
      this.SmsForm.value.user_Id = this.user_Id
      this.SmsForm.value.full_Name = this.Full_Name
      this.leadApi.saveSmsData(this.SmsForm.value).subscribe((res) => {
        console.log("sms", res);
        if (res.status == 1) {
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.SmsForm.reset();
          this.AllSmsDetails(this.Id)
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      });
    }
  }

  AllSmsDetails(Id) {
    this.config.startLoader();
    this.leadApi.getAllSms(Id).subscribe((res) => {
      console.log("All Sms Data", res);
        this.AllSMSDetails = res.sms_Details;
        this.config.stopLoader();
    });
  }

  SaveWhatsappMsg() {
    if (this.WhatsappForm.value.whatsapp_Id == null) {
      this.WhatsappForm.value.whatsapp_Id = 0;
    } else {
      this.WhatsappForm.value.leads_Id = parseInt(this.Id)
      this.WhatsappForm.value.company_Id = this.company_Id
      this.WhatsappForm.value.user_Id = this.user_Id
      this.WhatsappForm.value.full_Name = this.Full_Name
      this.leadApi.saveWhatsappMsg(this.WhatsappForm.value).subscribe((res) => {
        console.log("whatsapp", res);
        if (res.status == 1) {
          this.toastr.success("save Successfully", "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-success alert-with-icon",
          });
          this.WhatsappForm.reset();
          this.AllWhatsappMsg(this.Id)
        } else {
          this.toastr.error(res.message, "", {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: "toast-top-right",
            toastClass: "alert alert-error alert-with-icon",
          });
        }
      });
    }
  }

  AllWhatsappMsg(Id) {
    this.config.startLoader();
    this.leadApi.getAllWhatsappMsg(Id).subscribe((res) => {
      console.log("Whats Nsg", res);
        this.AllWhatsapp = res.whatsapp_Details;
        this.config.stopLoader();
    });
  }



}