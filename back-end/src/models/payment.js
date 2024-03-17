const { default: mongoose } = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    //! 구매자 정보
    user: {
      type: Object,
    },
    //! 결제 정보
    data: {
      type: Array,
      default: [],
    },
    //! 구매 상품 정보
    product: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
