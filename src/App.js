import { Component } from 'react'
import Dummydata from './Dummydata'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      students: Dummydata,
      duplicateroll: false,
      duplicateemail: false,
      currentbranch: undefined
    }
    this.branches = ["CS", "IT", "EC", "ME", "CE"]
  }
  add = (event) => {
    var obj1 = {
      RollNo: this.rollbox.value * 1,
      Name: this.namebox.value,
      Branch: this.branchbox.value,
      Email: this.emailbox.value,
      Marks: this.marksbox.value * 1 
      
    }
    event.preventDefault()
    event.target.reset()
    this.setState({ students: [...this.state.students, obj1] })
  }
  CheckRoll = () => {
    var RollNo = this.rollbox.value * 1
    var status = this.state.students.some(ob => ob.RollNo == RollNo)
    this.setState({ duplicateroll: status })

  }
  CheckEmail = () => {
    var Email = this.emailbox.value
    var status = this.state.students.some(ob => ob.Email == Email)
    this.setState({ duplicateemail: status })
  }

  removedata = (rollno) => {
    var status = window.confirm("Are You Want To Delete This Record!!!...")
    if (status) {
      this.setState({
        students: this.state.students.filter((rn) => rn != rollno)
      })
    }
  }

  render() {
    return (
      <>
        <div>
          <h4 className='alert alert-success text-center'><button className='text-uppercase btn btn-outline-dark'>Student Application</button></h4>
        </div>
        <hr />
        <div className='container bg-secondary p-3 rounded'>
          <h4 className='alert alert-success text-center'><button className='text-uppercase btn btn-outline-dark'>ADD NEW STUDENT RECORD</button></h4>
          <form onSubmit={this.add}>
            <div className='row'>
              <div className='col-xl-4 col-lg-4 col-md-4 mt-2'>
                <input type="number" placeholder='Enter Roll Number' ref={ob => this.rollbox = ob} className='form-control' required
                  onBlur={this.CheckRoll}
                  onFocus={() => { this.setState({ duplicateroll: false }) }}
                />
              </div>
              <div className='col-xl-4 col-lg-4 col-md-4 mt-2'>
                <input type="text" placeholder='Enter Name' ref={ob => this.namebox = ob} className='form-control' required />
              </div>
              <div className='col-xl-4 col-lg-4 col-md-4 mt-2'>
                <select className='form-control' ref={ob => this.branchbox = ob} required>
                  <option value=''>Select Branch</option>
                  {this.branches.map((bh) => <option>{bh}</option>)}
                </select>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-xl-4 col-lg-4 col-md-4 mt-2'>
                <input type="email" placeholder='Enter Email' ref={ob => this.emailbox = ob} className='form-control' required
                  onBlur={this.CheckEmail}
                  onFocus={() => { this.setState({ duplicateemail: false }) }}
                />
              </div>
              <div className='col-xl-4 col-lg-4 col-md-4 mt-2'>
                <input type="number" placeholder='Enter Marks' ref={ob => this.marksbox = ob} className='form-control' required />
              </div>
              <div className='col-xl-4 col-lg-4 col-md-4 mt-2'>
                <button className='btn btn-primary' disabled={this.state.duplicateroll || this.state.duplicateemail}>ADD STUDENT <i className="bi bi-plus-circle-dotted"></i></button>
              </div>
            </div>
            <b className='text-warning'>
              {this.state.duplicateroll ? "Roll No is Already Exist" : ""}
            </b> &nbsp; &nbsp;
            <b className='text-warning'>
              {this.state.duplicateemail ? "Email is Already Exist" : ""}
            </b>
          </form>
        </div>
        <hr />
        <div className='row mt-3 alert alert-success'>
          <h5 className='text-center text-uppercase'>Total Students Branch Wise</h5>
          <div className='col-xl-2 col-lg-2 col-md-2'>
            <button className='btn btn-outline-dark text-center' onClick={() => this.setState({ currentbranch: undefined })}>All : {this.state.students.length}</button>
          </div>
          {this.branches.map((bh) => <div className='col-xl-2 col-lg-2 col-md-2'>
            <button className='btn btn-outline-dark text-center' onClick={() => this.setState({ currentbranch: bh })}>{bh} - {this.state.students.reduce((pv, cv) => cv.Branch == bh ? pv + 1 : pv, 0)}</button>
          </div>)}
        </div>
        <hr />
        <div className='table-responsive mt-3'>
          <table className='table table-striped table-light table-hover'>
            <thead>
              <tr>
                <th>
                  S.No.
                </th>
                <th>
                  Roll No
                </th>
                <th>
                  Name
                </th>
                <th>
                  Branch
                </th>
                <th>
                  Email
                </th>
                <th>
                  Marks
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.filter(ob => this.state.currentbranch == undefined || ob.Branch == this.state.currentbranch).map((obj, index) => <tr>
                <td>{index + 1}</td>
                <td>{obj.RollNo}</td>
                <td>{obj.Name}</td>
                <td>{obj.Branch}</td>
                <td>{obj.Email}</td>
                <td>{obj.Marks}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => this.removedata(obj)}><i className="bi bi-trash3"></i></button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </>
    )
  }
} 