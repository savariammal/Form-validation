class FormValidation{
    formValues ={
        username: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: ""
    }
    errorValues = {
        usernameErr:"",
        emailErr: "", 
        phonenumberErr: "",
        passwordErr: "",
        confirmpasswordErr: ""
    }

    showErrorMsg(index, msg){
       const form_group = document.getElementsByClassName('from-group')[index];

       form_group.classList.add('error');

       form_group.getElementsByTagName('span')[0].textContent = msg;
    }
    showSuccessMsg(index){
        const form_group = document.getElementsByClassName('from-group')[index];

        form_group.classList.remove('error');

        form_group.classList.add('success');
    }
    getInputs(){
       this.formValues.username = document.getElementById('username').value.trim();

       this.formValues.email = document.getElementById('email').value.trim();

       this.formValues.phonenumber = document.getElementById("phonenumber").value.trim();

       this.formValues.password = document.getElementById('password').value.trim();

       this.formValues.confirmpassword = document.getElementById('confirmpassword').value.trim();
    }
    validateUsername(){
        if(this.formValues.username === ""){
            this.errorValues.usernameErr = "* Please Enter Your Name"

            this.showErrorMsg(0, this.errorValues.usernameErr)

        }else if(this.formValues.username.length <= 4){
            this.errorValues.usernameErr = "* Username Must Be Atleast 5 Characters"

            this.showErrorMsg(0,this.errorValues.usernameErr)

        }else if(this.formValues.username.length > 14){
            this.errorValues.usernameErr = "* Username Should Not Exceeds 14 Characters"

            this.showErrorMsg(0,this.errorValues.usernameErr)

        }else{
            this.errorValues.usernameErr = "";

            this.showSuccessMsg(0)
        }
    }
    validateEmail(){
        //abc@gmail.co.in
        //^ starting of string
        //$ ending point
        const regExp = /^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/

        if(this.formValues.email === ""){
            this.errorValues.emailErr = "* Please Enter Valid Email"
            
            this.showErrorMsg(1,this.errorValues.emailErr)
        }else if(!(regExp.test(this.formValues.email))){
            this.errorValues.emailErr = "* Invallid Email"
            this.showErrorMsg(1,this.errorValues.emailErr)
        }else{
            this.errorValues.emailErr = ""

            this.showSuccessMsg(1)
        }

    }
    validatePhonenumber(){
        const phnumber = /^\d{10}$/

        if(this.formValues.phonenumber === ""){
            this.errorValues.phonenumberErr = "* Please Enter Valid Number"

            this.showErrorMsg(2,this.errorValues.phonenumberErr)

        }else if((phnumber.test(this.formValues.phonenumber))){
            this.errorValues.phonenumberErr = ""

            this.showSuccessMsg(2)

        }else{
            this.errorValues.phonenumberErr = "Invalid Phonenumber"

            this.showErrorMsg(2,this.errorValues.phonenumberErr)           
        }

    }
    validatePassword(){
        if(this.formValues.password === ""){
            this.errorValues.passwordErr = "* Please Provide a Password"

            this.showErrorMsg(3,this.errorValues.passwordErr)
        }else if(this.formValues.password.length <= 4){
            this.errorValues.passwordErr = "* Password Must Be Atleast 5 Characters"
            this.showErrorMsg(3,this.errorValues.passwordErr)
        }else if(this.formValues.password.length > 10){
            this.errorValues.passwordErr = "* Password Should Not Exceed 10 Characters"

            this.showErrorMsg(3,this.errorValues.passwordErr)
        }else{
            this.errorValues.passwordErr = ""

            this.showSuccessMsg(3)
        }
    }

    validateConfirmPassword(){

        if(this.formValues.confirmpassword === ""){
            this.errorValues.confirmpasswordErr = "* Invalid Confirmpassword"

            this.showErrorMsg(4,this.errorValues.confirmpasswordErr)

        }else if(this.formValues.confirmpassword === this.formValues.password && this.errorValues.passwordErr === ""){
            this.errorValues.confirmpasswordErr = ""

            this.showSuccessMsg(4)
        }else if(this.errorValues.passwordErr){
            this.errorValues.confirmpasswordErr = "* An error occurred in Password Field"

            this.showErrorMsg(4, this.errorValues.confirmpasswordErr)
        }else{
            this.errorValues.confirmpasswordErr = "* Password Must Match"

            this.showErrorMsg(4, this.errorValues.confirmpasswordErr)
        }
    }
   
    altertMessage(){

        const {usernameErr, phonenumberErr, emailErr, passwordErr, confirmpasswordErr} = this.errorValues

        if(usernameErr === "" && emailErr === "" && phonenumberErr == "" && passwordErr === "" && confirmpasswordErr === ""){
            swal("Registration Successful", "Thank You!, " +this.formValues.username.toLocaleUpperCase(),"success").then(() => {
                console.log(this.formValues);

                this.removeInput();

            })

          
        }else{
            swal("Give Valid Inputs")
        }
    }

    removeInput(){
        const form_groups = document.getElementsByClassName("from-group")

        console.log(form_groups)

        Array.from(form_groups).forEach(element => {
            element.getElementsByTagName('input')[0].value = ""

            element.getElementsByTagName('span')[0].textContent = ""

            element.classList.remove("success")
        });
    }

}

const ValidateUserInputs = new FormValidation();

document.getElementsByClassName('form')[0].addEventListener('submit', event => {
    event.preventDefault();

    ValidateUserInputs.getInputs();

    ValidateUserInputs.validateUsername();

    ValidateUserInputs.validateEmail();

    ValidateUserInputs.validatePhonenumber();

    ValidateUserInputs.validatePassword();

    ValidateUserInputs.validateConfirmPassword();

    ValidateUserInputs.altertMessage();

    // ValidateUserInputs.removeInput();
})
