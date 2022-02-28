const whole_app = new Vue({
    el: '.root',
    data: {
        rubber_price_tocom: null,
        rubber_price_shfe: null,
    },
    methods: {
        new_data_today: function () {
            console.log(this.new_data_today_add_name, this.new_data_today_add_once, this.new_data_today_add_both);
            document.querySelector(".modal_close_button_1").click();
        },
        new_member_add: function () {
            document.querySelector(".modal_close_button_2").click();
        },
        async get_tocom() {
            let tocom_result = await axios.get('https://cf.market-info.jp/jpx/json/commodity_value?lang=en');
            this.rubber_price_tocom = tocom_result.data['RSS3 Rubber Futures'];
        },
        async get_rubber_price() {
            axios.get('http://www.shfe.com.cn/data/delaymarket_ru.dat')
                .then(res => {
                    console.log(res.data);
                    // res = res.data;
                    // this.rubber_price_tocom = res.tocom_data;
                    // this.rubber_price_shfe = res.shfe_data;
                });
        },
        upperdown_watcher: function (input_price_change) {
            if (input_price_change != 0) {
                return input_price_change < 0;
            }
            return true;
        },
    },
    computed: {
        day: function () {
            return String(new Date().getDate()).padStart(2, '0');
        },
        month: function () {
            return String(new Date().getMonth() + 1).padStart(2, '0');
        },
        year: function () {
            return new Date().getFullYear();
        },
        tocom_price_change: function () {
            return this.rubber_price_tocom.previousDayComparison > 0;
        },
        tocom_price_compare: function () {
            return this.tocom_price_change ? "+" + this.rubber_price_tocom.previousDayComparison : this.rubber_price_tocom.previousDayComparison;
        }
    },
    created() {
        this.get_rubber_price();
    }
});