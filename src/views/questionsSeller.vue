<template>
  <div
      class="nav-wrapper questionsSeller position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header">
      <h6>نام میزبان:</h6>
      <span>{{ sellerName }}</span>
    </div>
    <div class="container-lg-fluid">
      <div class="accordion mt-3" id="accordionExample">
        <div class="accordion-item" v-for="(item , i) in questionListBy" :key="i">
          <div class="category">
            دسته: {{ item.categoryName }}
          </div>
          <p class="question-text">
            {{ item.questionText }}
          </p>
          <div class="response-question">
            <div v-for="(btn , av) in answerQuestionList" :key="av">
              <input type="radio" v-model="btn.answerValue" :name="item.arrayId + index + i"
                     :id="'ans' + av + i + index" :value="btn.answerValue" @click="selectBtn(av , i)">
              <label @click="selectBtn(av , i)" :for="'ans' + av + i + index">{{ btn.title }}</label>
            </div>
          </div>
          <div :id="'collapse' + index + i" class="accordion-collapse collapse" aria-labelledby="headingOne"
               data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <textarea class="global-input" placeholder="توضیحات:" v-model="item.description"></textarea>
            </div>
          </div>
          <button @click="rotation = !rotation" class="accordion-button" type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#collapse' + index + i" aria-expanded="true"
                  :aria-controls="'collapse' + index + i">
            <svg :style="rotation ? 'transform: rotate(180deg);' : ''" xmlns="http://www.w3.org/2000/svg" width="19"
                 height="19" viewBox="0 0 19 19" fill="none">
              <path
                  d="M14.3894 8.19913C14.647 7.93914 14.6452 7.51949 14.3852 7.26181C14.1252 7.00413 13.7055 7.006 13.4479 7.26599L11.9037 8.82396C11.277 9.45626 10.8458 9.88999 10.4803 10.1835C10.1253 10.4686 9.89731 10.5664 9.6931 10.5924C9.56487 10.6087 9.43513 10.6087 9.3069 10.5924C9.10269 10.5664 8.87468 10.4686 8.51969 10.1835C8.15425 9.88999 7.72296 9.45626 7.09628 8.82396L5.55215 7.26599C5.29447 7.006 4.87481 7.00413 4.61483 7.26181C4.35484 7.51949 4.35297 7.93914 4.61065 8.19913L6.1826 9.78517C6.77463 10.3825 7.25852 10.8708 7.68966 11.217C8.138 11.5771 8.59306 11.8377 9.1393 11.9073C9.37881 11.9379 9.62119 11.9379 9.8607 11.9073C10.4069 11.8377 10.862 11.5771 11.3103 11.217C11.7415 10.8708 12.2253 10.3826 12.8174 9.7852L14.3894 8.19913Z"
                  fill="#664ECA"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.25329 14.7467 0 9.5 0ZM1.32558 9.5C1.32558 4.98539 4.98539 1.32558 9.5 1.32558C14.0146 1.32558 17.6744 4.98539 17.6744 9.5C17.6744 14.0146 14.0146 17.6744 9.5 17.6744C4.98539 17.6744 1.32558 14.0146 1.32558 9.5Z"
                    fill="#664ECA"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="finish-visit">
        <div class="rate-visit">
          <h6>امتیاز شما به این بازدید:</h6>
          <input type="number" class="global-input" min="0" max="10" v-model="rateVisit" @input="limitNumber()">
        </div>
        <khoonegiButton
            class="form-button slate-not"
            text="تایید"
            :loading="isLoading"
            @click="registerVisitAnswer"
        />
      </div>

    </div>
  </div>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "@/components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import khoonegiButton from "@/components/khoonegiButton";

export default {
  name: "questionsSeller",
  components: {
    LoadingFull,
    pageToTop,
    khoonegiButton
  },
  data() {
    return {
      rotation: false,
      descriptionQuestion: "",
      windowWith: window.innerWidth,
      toast: useToast(),
      isLoading: false,
      questionList: [],
      sellerName: "",
      kitchenVisitId: "",
      background: "",
      color: "",
      answerQuestionList: this.$store.state.answerQuestion,
      answers: [],
      answerValue: 0,
      rateVisit: 0,
      questionListBy: []

    }
  },
  created() {
    this.getQuestionList()
  },
  methods: {
    limitNumber() {
      if (this.rateVisit > 10) {
        this.rateVisit = 10;
      }
      if (this.rateVisit < 0) {
        this.rateVisit = 0;
      }
    },
    selectBtn(i, index) {
      console.log(index)
      Object.assign(this.questionListBy[index], {answerValue: this.answerQuestionList[i].value})
    },
    getQuestionList() {
      this.isLoading = true;
      let data = this.$route.params.sellerId;
      this.$store
          .dispatch("enabledHealthQuestionsList", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              // this.questionList = respons.data.sellerQuestions.questions;
              console.log(respons.data.enabledHealthQuestions)
              //   respons.data.sellerQuestions.questions.map((item)=>{
              //   console.log(item.categoryName)
              //   // this.questionListBy.map((arr)=>{
              //   //   arr.categoryName = item.categoryName;
              //   // })
              //     this.questionListBy = this.questionListBy.concat(item.questions);
              //   console.log(this.questionListBy)
              // })
              this.questionListBy = respons.data.enabledHealthQuestions;
              this.sellerName = respons.data.sellerInfo.sellerName;
              this.kitchenVisitId = respons.data.sellerInfo.sellerId;
              this.questionListBy.forEach((item) => {
                item.description = "";
                item.answer = [];
                item.arrayId = "quID"
              })
            } else {
              this.toast.error(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            }

          })
          .catch((error) => {
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
    registerVisitAnswer() {
      this.questionListBy.map((item) => {
        console.log(item)
        item.answer.splice(1, 0, {Note: item.description, QuestionId: item.questionId, Answer: item.answerValue});
      })
      this.isLoading = true;
      console.log(this.questionListBy)
      let data = {
        Date: this.$route.params.date,
        Description: "",
        VisitType: this.$route.params.type,
        VisitStatus: this.$route.params.status,
        SellerId: this.kitchenVisitId,
        Score: this.rateVisit,
        Answers: this.questionListBy.map((item) => {
          return item.answer[0]
        }),
      };
      this.$store
          .dispatch("addKitchenVisitAnswers", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            } else {
              this.toast.error(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            }

          })
          .catch((error) => {
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
  }
}
</script>

<style lang="scss">
.questionsSeller {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  @media (max-width: 768px) {
    font-size: 13px;
    p, button {
      font-size: 13px !important;
    }
  }

  .finish-visit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 7rem;

    .rate-visit {
      width: 20rem;
      display: grid;
      grid-template-columns: 60% 25%;
      align-items: center;

      input {
        text-align: center;
      }

      h6 {
        margin: 0;
      }
    }

    .form-button {
      width: 12rem;
    }
  }


  .header {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 15px;
    display: flex;
    column-gap: 0.3rem;

    h6 {
      color: #664eca;
      font-size: 14px;
      margin: 0;
    }

    span {
      font-size: 14px;
    }
  }

  .accordion {
    .category {
      display: inline-block;
      background-color: #664ECA;
      color: #fff;
      border-radius: 10px;
      padding: 7px 50px;
      margin-top: 15px;

      @media (max-width: 768px) {
        display: block;
        padding: 7px 30px;
      }
    }

    .question-text {
      line-height: 40px !important;
      margin-top: 2rem;
    }

    .response-question {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      column-gap: 13px;
      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
      }

      div {
        display: flex;
        column-gap: 1rem;
      }

      label {
        display: block;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400 !important;
      }

      input[type="radio"] {
        visibility: hidden;
      }

      input[type="radio"]::before {
        border: 2px solid gray;
        height: 1.2em;
        width: 1.2em;
        border-radius: 50%;
        display: block;
        content: " ";
        cursor: pointer;
        visibility: visible;
      }

      input[type="radio"]:checked ~ label {
        color: #664eca;
      }

      input[type="radio"]:checked::before {
        background: radial-gradient(#664eca 50%, transparent 60%);
        border: 2px solid #664eca;
      }

      //label {
      //  background-color: #fff;
      //  border-radius: 10px;
      //  border: 1px solid #664ECA;
      //  color: #664ECA;
      //  font-size: 14px;
      //  padding: 4px 30px;
      //  cursor: pointer;
      //  user-select: none;
      //
      //  //&:hover {
      //  //  color: #fff;
      //  //  background-color: #664ECA;
      //  //}
      //
      //}
    }

    .accordion-body {
      width: 32rem;
      margin: 1rem auto;
      @media (max-width: 768px) {
        width: 100%;
        padding: 0;
      }

      textarea {
        height: 8rem;
      }
    }

    .accordion-button {
      flex-direction: row-reverse;
      position: relative;
      padding: 0;
      margin-top: 1.5rem;
      @media (max-width: 768px) {
        padding-left: 0;
        padding-right: 0;
      }

      svg {
        z-index: 9;
        background-color: #fff;
      }

      &:before {
        content: "";
        position: absolute;
        left: 1%;
        background-color: #E9E9E9;
        width: 98%;
        height: 1px;
        z-index: 0;
      }
    }
  }
}
</style>
