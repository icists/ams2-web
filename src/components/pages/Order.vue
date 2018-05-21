<template>
  <div>
    <sui-container text>
      <sui-form equalWidth size="large">
        <base-header text="Select Your Options" class="header" />
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>Stage</label>
            <input :value="appStage" disabled />
          </sui-form-field>
          <sui-form-field>
            <label>Applicant</label>
            <input :value="user.fullName" disabled />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-fields :field="2">
          <sui-form-field>
            <label>Group Discount</label>
            <input
              :value="groupDiscount ? 'Yes' : 'No'"
              disabled
            />
          </sui-form-field>
          <sui-form-field>
            <label>Preferred Currency</label>
            <sui-dropdown
              selection
              v-model="order.preferredCurrency"
              :options="currencyOptions"
            />
          </sui-form-field>
        </sui-form-fields>
        <sui-form-field>
          <label>Accommodation</label>
          <sui-dropdown
            placeholder="Select your room"
            selection
            v-model="order.accommodation"
            :options="accommodationOptions"
          />
        </sui-form-field>
        <sui-form-field>
          <label>Dieatry Preferences (if any)</label>
          <input v-model="order.dietaryPreferences" />
        </sui-form-field>
        <sui-form-field>
          <label>Other Options</label>
          <sui-form-field v-for="option in selectableOptions" :key="option.code">
            <sui-checkbox
              toggle
              v-model="selections[option.code]"
              :label="`${option.description} (${getPriceText(option.code)})`"
            />
          </sui-form-field>
        </sui-form-field>
      </sui-form>
      <div style="height: 60px" />
      <base-header text="Receipt" class="header" />
      <sui-table basic="very">
        <sui-table-body>
          <sui-table-row>
            <sui-table-cell>Registration Fee ({{appStage}})</sui-table-cell>
            <sui-table-cell text-align="right">{{getPriceText(appStage)}}</sui-table-cell>
          </sui-table-row>
          <sui-table-row v-if="order.accommodation">
            <sui-table-cell>Accommodation Fee</sui-table-cell>
            <sui-table-cell text-align="right">{{getPriceText(accommodationCode)}}</sui-table-cell>
          </sui-table-row>
          <sui-table-row v-if="groupDiscount">
            <sui-table-cell>Group Discount</sui-table-cell>
            <sui-table-cell text-align="right">{{getPriceText('group')}}</sui-table-cell>
          </sui-table-row>
          <sui-table-row
            v-for="option in selectableOptions"
            :key="option.code"
            v-if="selections[option.code]"
          >
            <sui-table-cell>{{option.description}}</sui-table-cell>
            <sui-table-cell text-align="right">{{getPriceText(option.code)}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
        <sui-table-footer>
          <sui-table-row>
            <sui-table-header-cell><b>Total</b></sui-table-header-cell>
            <sui-table-header-cell text-align="right"><b>{{totalText}}</b></sui-table-header-cell>
          </sui-table-row>
        </sui-table-footer>
      </sui-table>
      <div style="height: 60px" />
      <base-header text="Payment" class="header" />
      <sui-table basic="very">
        <sui-table-body>
          <sui-table-row v-for="item in paymentInfoItems" :key="item.code">
            <sui-table-cell :width="8">{{item.description}}</sui-table-cell>
            <sui-table-cell>{{paymentInfo[item.code]}}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
      <sui-divider horizontal>Or</sui-divider>
      <sui-table basic="very">
        <sui-table-body>
          <sui-table-row>
            <sui-table-cell :width="8">PayPal</sui-table-cell>
            <sui-table-cell>help@icists.org</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
      <base-button
        id="save-button"
        link="/dashboard"
        :color="colors.icistsBlue"
        @click.native="onComplete()"
      >
        Save
      </base-button>
    </sui-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Order',

    computed: {
      ...mapGetters({
        user: 'user',
        application: 'application',
        order: 'order',
        stage: 'stage',
        accommodations: 'accommodations',
        options: 'options',
        paymentInfo: 'paymentInfo',
      }),
      appStage() {
        const stage = (this.application && this.application.stage) || this.stage;
        return this.stageMap[stage];
      },
      accommodationOptions() {
        return this.accommodations.map(({ id, description, priceKrw, priceUsd, capacity }) => {
          const priceText = this.order.preferredCurrency === 'KRW' ?
            `${priceKrw} KRW` :
            `${priceUsd} USD`;
          return {
            value: id,
            text: `${description} - ${capacity} people / room (${priceText})`,
          };
        });
      },
      groupDiscount() {
        if (!this.application) return false;
        return this.application.groupDiscount;
      },
      priceDict() {
        const res = {};
        [...this.options, ...this.accommodations].forEach((opt) => {
          res[opt.code] = { id: opt.id, KRW: opt.priceKrw, USD: opt.priceUsd };
        });
        return res;
      },
      accommodationCode() {
        const selected = this.accommodations.find(opt => opt.id === this.order.accommodation);
        return selected ? selected.code : '';
      },
      totalText() {
        let total = 0;
        const { preferredCurrency } = this.order;
        if (!preferredCurrency) {
          return 'Select the currency';
        }

        const getPrice = (code) => {
          const price = this.priceDict[code];
          return price ? parseInt(price[preferredCurrency], 10) : 0;
        };
        // Registration fee
        total += getPrice(this.appStage.toLowerCase());
        // Accommodation fee
        total += getPrice(this.accommodationCode);
        // Group Discount
        if (this.groupDiscount) {
          total += getPrice('group');
        }
        // Other options
        for (const option of this.selectableOptions) {
          const { code } = option;
          if (this.selections[code]) {
            total += getPrice(code);
          }
        }
        return `${total} ${preferredCurrency}`;
      },
    },

    async created() {
      this.$store.dispatch('getUser');
      this.$store.dispatch('getApplication');
      this.$store.dispatch('getStage');
      this.$store.dispatch('getAccommodations');
      this.$store.dispatch('getOptions');
      this.$store.dispatch('getPaymentInfo');
      await this.$store.dispatch('getOrder');
      const selectedOptions = this.options.filter(opt => this.order.options.includes(opt.id));
      selectedOptions.forEach(opt => {
        this.selections[opt.code] = true;
      });
    },

    data() {
      return {
        colors: this.$store.state.colors,
        stageMap: {
          E: 'Early',
          R: 'Regular',
          L: 'Late',
        },
        currencyOptions: [
          { value: 'KRW', text: 'KRW' },
          { value: 'USD', text: 'USD' },
        ],
        selectableOptions: [
          { code: 'breakfast', description: 'Breakfast' },
          { code: 'tshirts', description: 'T-shirts' },
          { code: 'pre', description: 'Pre-conference Banquet' },
        ],
        selections: {
          breakfast: false,
          tshirts: false,
          pre: false,
        },
        paymentInfoItems: [
          { code: 'bankName', description: 'Bank Name' },
          { code: 'bankBranch', description: 'Branch' },
          { code: 'accountNumber', description: 'Account Number' },
          { code: 'recipient', description: 'Recipient' },
          { code: 'swiftCode', description: 'SWIFT Code' },
        ],
      };
    },

    methods: {
      async onComplete() {
        const getId = (code) => {
          const price = this.priceDict[code];
          return price ? price.id : null;
        };

        const options = [];
        // Registration fee
        let id = getId(this.appStage.toLowerCase());
        if (id) options.push(id);
        // Group Discount
        if (this.groupDiscount) {
          id = getId('group');
          if (id) options.push(id);
        }
        // Other options
        for (const option of selectableOptions) {
          const { code } = option;
          if (this.selections[code]) {
            id = getId(code);
            if (id) {
              options.push(id);
            }
          }
        }
        this.order.options = options;

        try {
          if (this.order.id) {
            await this.$store.dispatch('updateOrder', {
              params: { id: this.order.id },
              data: this.order,
            });
          } else {
            await this.$store.dispatch('createOrder', {
              data: this.order,
            });
          }
          alert('Your order was saved.');
          this.$router.push('/dashboard');
        } catch (error) {
          console.error(error.response);
        }
      },
      getPriceText(inputCode) {
        const { preferredCurrency } = this.order;
        if (!preferredCurrency) {
          return 'Select the currency';
        }
        const code = inputCode.toLowerCase();
        const price = this.priceDict[code];
        if (!price) {
          return '-';
        }
        return `${price[preferredCurrency]} ${preferredCurrency}`;
      },
      ...mapActions([
        'createApplication',
        'updateApplication',
      ]),
    },

    components: {
      BaseButton: () => import('@/components/common/BaseButton'),
      BaseHeader: () => import('@/components/common/BaseHeader'),
    },
  };
</script>

<style scoped>
  label {
    margin-bottom: 1rem !important;
  }

  .header {
    margin-bottom: 2rem;
  }

  .autofill {
    font-size: 1.4rem;
    font-weight: normal;
  }

  #save-button {
    margin-top: 4rem;
    float: right;
  }
</style>
