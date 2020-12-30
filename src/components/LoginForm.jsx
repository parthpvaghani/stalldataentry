import {React,Component} from 'react'
import './loginform.css'
import firebase from 'firebase'
import AlertDialog from './AlertDialog'
class LoginForm extends Component{
    state = {
           email : '',
           password : '',
           secretkey : '',
           alertDialog:{
               isOpen:false,
               title:'',
               subTitle:''
           }
       }
     
    componentDidMount(){
        
    }
    setAlertDialogfunc = () => {
        this.setState({
            alertDialog:{
                isOpen: false,
                title: "",
                subTitle: "",
            }
        });
      };

    handleChange = (e) => {
           this.setState({
                [e.target.name]: e.target.value
           })
    }
    handleLogin = (e) =>{
        e.preventDefault();
        const { email, password,secretkey} = this.state
        if(email ==="" || password==="" || secretkey ===""){
            alert('please enter required fields')
        }
        else{
            let MatchSecretKey = new Promise((resolve,reject)=>{
                firebase.firestore().collection('StallList').where('projectid','==',secretkey).get().then(snapshot=>{
                    console.log(snapshot)
                    if(snapshot.size>0)
                    {
                        resolve(this.state.secretkey)
                    }else{
                        reject('NoKeyAvailable')
                    }
                })
            })
            MatchSecretKey.then(secretkey=>{
                firebase.auth().signInWithEmailAndPassword(email,password)
                .then((user) => {
                    window.location.href="/stallformdetails"
                })
                .catch((error) => {
                    this.setState({
                        alertDialog:{
                            isOpen:true,
                            title:'Email id Or Password Is Wrong!!'
                        }
                    })
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                });
            }).catch(err=>{
                this.setState({
                    alertDialog:{
                        isOpen:true,
                        title:'Provided Secret Key is not Valid'
                    }
                })
            })
        }
        
    }
     
    
     render() {
       return (
           <div className="App">
           <div className="left"></div>
           <div className="right">
           <h2>Stall<span> Data Entry</span></h2>
           <p className="Paragraph">Welcome back! Log in to your account</p>
            <div className="form">
             <form>
                 <input type="text" name="email" placeholder="Email" className="logininputfield" onChange={this.handleChange} />
                 <input type="password" name="password" placeholder="Password" className="logininputfield" onChange={this.handleChange} />
                 <input type="text" name="secretkey" placeholder="Stall Secret Key" className="logininputfield" onChange={this.handleChange} />
                 <button className="loginbutton" onClick={this.handleLogin} >Log in</button>
             </form>
             </div>
           </div>
           <AlertDialog alertDialog={this.state.alertDialog} setAlertDialog={this.setAlertDialogfunc} />
           </div>
   
       );
     }
   }
   
export default LoginForm