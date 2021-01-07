<template>
  <div>
    <div class="register-wrapper">
    <div id="register">
      <p class="title">登录</p>
      <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="0"
              class="demo-ruleForm"
      >
        <el-form-item prop="tel">
          <v-text-field v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号"></v-text-field>
        </el-form-item>
        <el-form-item prop="smscode" class="code">
          <v-text-field  v-model="ruleForm2.smscode" placeholder="验证码"></v-text-field>
          <v-btn type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</v-btn>
        </el-form-item>
        <el-form-item prop="pass">
          <v-text-field  type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="输入密码"></v-text-field>
        </el-form-item>
        <el-form-item>
          <v-btn type="primary" @click="submitForm('ruleForm2')" style="width:100%;">登录</v-btn>
          <p class="login" @click="gotoLogin">没有账号？立即注册</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>

</template>
<script>
  export default {
    name: "Register",
    data() {
      // <!--验证手机号是否合法-->
      let checkTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!this.checkMobile(value)) {
          callback(new Error('手机号码不合法'))
        } else {
          callback()
        }
      }
      //  <!--验证码是否为空-->
      let checkSmscode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机验证码'))
        } else {
          callback()
        }
      }
      // <!--验证密码-->
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.ruleForm2.checkPass !== "") {
            this.$refs.ruleForm2.validateField("checkPass");
          }
          callback()
        }
      }
      // <!--二次验证密码-->
      let validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: "",
          checkPass: "",
          tel: "",
          smscode: ""
        },
        rules2: {
          pass: [{ validator: validatePass, trigger: 'change' }],
          checkPass: [{ validator: validatePass2, trigger: 'change' }],
          tel: [{ validator: checkTel, trigger: 'change' }],
          smscode: [{ validator: checkSmscode, trigger: 'change' }],
        },
        buttonText: '发送验证码',
        isDisabled: false, // 是否禁止点击发送验证码按钮
        flag: true
      }
    },
    methods: {
      // <!--发送验证码-->
      sendCode () {
        let tel = this.ruleForm2.tel
        if (this.checkMobile(tel)) {
          console.log(tel)
          let time = 60
          this.buttonText = '已发送'
          this.isDisabled = true
          if (this.flag) {
            this.flag = false;
            let timer = setInterval(() => {
              time--;
              this.buttonText = time + ' 秒'
              if (time === 0) {
                clearInterval(timer);
                this.buttonText = '重新获取'
                this.isDisabled = false
                this.flag = true;
              }
            }, 1000)
          }
        }
      },
      // <!--提交注册-->
      submitForm(formName) {
          this.$router.push({
          path: "/"
        });
        this.$refs[formName].validate(valid => {
          if (valid) {
            setTimeout(() => {
              alert('注册成功')
            }, 400);
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },
      // <!--进入登录页-->
      gotoLogin() {
        this.$router.push({
          path: "/register"
        });
      },
      // 验证手机号
      checkMobile(str) {
        let re = /^1\d{10}$/
        return re.test(str);
      }
    }
  };
</script>

<style scoped>
  .loading-wrapper {
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-wrapper img {
    position: absolute;
    z-index: 1;
  }
  .register-wrapper {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
  }
  #register {
    max-width: 340px;
    margin: 60px auto;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
    z-index: 9;
  }
  .title {
    font-size: 26px;
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
  }
  .el-form-item {
    text-align: center;
  }
  .login {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }
  .login:hover {
    color: #2c2fd6;
  }
  .code >>> .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .code button {
    margin-left: 20px;
    width: 140px;
    text-align: center;
  }
  .el-button--primary:focus {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
  }
</style>