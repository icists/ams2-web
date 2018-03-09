<template>
  <div>
    <base-row>
      <base-header text="Register"/>
      <el-form @submit.native.prevent="register()">
        <table>
          <tr>
            <td>Email</td>
            <td>
              <el-input v-model="user.email" type="text" placeholder="Email"></el-input>
            </td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>
              <el-input v-model="user.first_name" type="text" placeholder="David"></el-input>
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              <el-input v-model="user.last_name" type="text" placeholder="Beckham"></el-input>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <el-input v-model="user.password1" type="password" placeholder="Password"></el-input>
            </td>
          </tr>
          <tr>
            <td>Password Confirmation</td>
            <td>
              <el-input v-model="user.password2" type="password" placeholder="Password"></el-input>
            </td>
          </tr>
          <tr>
            <td>Birthday</td>
            <td>
              <el-date-picker
                v-model="user.birthday"
                type="date"
                placeholder="Click">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td>Nationality</td>
            <td>
              <el-select v-model="user.nationality" placeholder="Where are you from?">
                <el-option v-for="gender in policy.nationality"
                           :key="gender.value"
                           :label="gender.label"
                           :value="gender.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>School</td>
            <td>
              <el-select v-model="user.school" placeholder="Find your school">
                <el-option v-for="item in policy.schools"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>
              <el-input placeholder="Numbers Only!" v-model="user.phone_number">
                <template slot="prepend">+</template>
              </el-input>
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>
              <el-select v-model="user.gender" placeholder="Select Gender">
                <el-option v-for="item in policy.genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <el-button native-type="submit">Register</el-button>
            </td>
          </tr>
        </table>

        <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
      </el-form>

    </base-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Register',

    computed: mapGetters({
      user: 'user',
    }),

    data() {
      return {
        policy: {
          genders: [
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
            { value: 'O', label: 'Other' },
          ],
          schools: [
            { value: 'KAIST', label: 'KAIST' },
          ],
          nationality: [
            { value: 'KR', label: 'Republic of Korea' },
          ],
        },
        colors: this.$store.state.colors,
        rememberMe: true,
        fetchUser: false,
        error: false,
      };
    },

    methods: {
      register() {
        this.$auth.register({
          data: this.user,
          success(res) {
            localStorage.setItem('default_auth_token', res.data.token);
            this.$router.push('/');
          },
          error() {},
          rememberMe: true,
        });
      },
      ...mapActions([
        'createUser',
      ]),
    },

    components: {
      BaseHeader: () => import('@/components/common/BaseHeader'),
      BaseRow: () => import('@/components/common/BaseRow'),
      BaseButton: () => import('@/components/common/BaseButton'),
    },
  };
</script>
