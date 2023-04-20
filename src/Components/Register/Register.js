import { Component } from "react";

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            name:''

        }
    }
    registerName = (event) => {
        this.setState({name: event.target.value})


    }
    registerEmail = (event) => {
        this.setState({email: event.target.value})


    }
    registerPasswod = (event) => {
        this.setState({password: event.target.value})


    }
    register=()=> {
        fetch ('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name
            })
        })
        .then (response=>response.json())
        
        .then(user=>{
            
            if(user.id){
                this.props.loadUser(user)
                this.props.loadImg()
                
                
                this.props.onRouteChange('home')
            } 
        })

        

    }
    render(){
        
        return (
            
            <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-4 center"> 
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div class="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={this.registerName}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.registerEmail}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.registerPasswod}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" 
                        onClick={this.register}
                        value="Register"/>
                        </div>
                        
                    </div>
                    </main>
                
            </div>
    
    
        )

    }
    
}




export default Register;