<template>
  <div class="entrust-orders">
    <div class="o-top">
      <div class="fl tl">买</div>
      <div class="fr tr">卖</div>
    </div>

    <div class="cb list">
      <div class="fl buy">
        <ul>
          <li>
            <h6 style="width: 90%"></h6>
            <p>5689<span class="fr">0.2658</span></p>
          </li>
          <li>
            <h6 style="width: 67%"></h6>
            <p>5689<span class="fr">0.2658</span></p>
          </li>
          <li>
            <h6 style="width: 60%"></h6>
            <p>5689<span class="fr">0.2658</span></p>
          </li>
          <li>
            <h6 style="width: 50%"></h6>
            <p>5689<span class="fr">0.2658</span></p>
          </li>
          <li>
            <h6 style="width: 20%"></h6>
            <p>5689<span class="fr">0.2658</span></p>
          </li>
        </ul>
      </div>
      <div class="fr sell">
        <ul>
          <li>
            <h6 style="width: 30%"></h6>
            <p><span class="fl">0.2658</span>5689</p>
          </li>
          <li>
            <h6 style="width: 50%"></h6>
            <p><span class="fl">0.2658</span>5689</p>
          </li>
          <li>
            <h6 style="width: 60%"></h6>
            <p><span class="fl">0.2658</span>5689</p>
          </li>
          <li>
            <h6 style="width: 80%"></h6>
            <p><span class="fl">0.2658</span>5689</p>
          </li>
          <li>
            <h6 style="width: 90%"></h6>
            <p><span class="fl">0.2658</span>5689</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "entrust-orders"
  }
</script>

<style lang="less">
  .entrust-orders {
    .o-top {
      height: 1rem;
      margin: 0 0 0 0;
      font-size: 0.8rem;
      line-height: 1rem;
    }
    .list {
      .buy, .sell {
        width: 50%;
        ul {
          margin: 0.25rem 0 0 0;
          li {
            background-color: #14272c;
            height: 1.2rem;
            h6 {
              background-color: #141627;
              height: 1.2rem;
              text-align: right;
            }
            p {
              font-size: 0.8rem;
              line-height: 1.2rem;
              position: relative;
              z-index: 55;
              top: -1.2rem;
              width: 100%;
              span {
                display: block;
                position: relative;
                padding: 0 0.25rem 0 0;
              }
            }

          }
        }
      }
      .sell {
        ul {
          li {
            text-align: right;
            background-color: #141627;
            h6 {
              background-color: #291b2c;
              height: 1.2rem;
            }
            p {
              span {
                padding: 0 0 0 0.25rem;
              }
            }
          }
        }
      }
    }
  }
</style>
