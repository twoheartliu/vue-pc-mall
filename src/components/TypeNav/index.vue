<template>
  <div class="type-nav">
    <!-- {{ categoryList }} -->
    <div class="container" @mouseenter="handleNavShow" @mouseleave="leaveIndex">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="currentIndex === index ? 'active' : ''"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" v-show="currentIndex === index">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
import { removeEmptyElement } from '@/utils'

export default {
  name: 'TypeNav',
  // 组件挂载完毕
  data () {
    return {
      currentIndex: -1,
      show: true
    }
  },
  computed: {
    ...mapState('home', ['categoryList']),
  },
  mounted () {
    // 当路由不在首页时默认不显示三级菜单
    if (this.$route.path !== '/') {
      this.show = false
    }
  },
  methods: {
    changeIndex: throttle(function (index) {
      // index 鼠标移到某一级分类的索引
      this.currentIndex = index
    }, 50),
    leaveIndex () {
      // index 鼠标移出
      this.currentIndex = -1
      if (this.$route.path !== '/') {
        this.show = !this.show
      }
    },
    handleNavShow () {
      this.show = true
    },
    goSearch (e) {
      // 获取标签名
      const { categoryname, category1id, category2id, category3id } = e.target.dataset

      const location = { name: 'search' }
      let query = {
        categoryName: categoryname,
        category1Id: category1id,
        category2Id: category2id,
        category3Id: category3id
      }
      location.query = removeEmptyElement(query)

      // 判断 $route params 是否存在，如果存在，则带上它
      if (this.$route.params) {
        location.params = this.$route.params
      }
      this.$router.push(location)
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  a {
    &:hover {
      cursor: pointer;
    }
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          &.active {
            background: skyblue;
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态(进入)
    .sort-enter {
      height: 0;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画速率、时间
    .sort-enter-active {
      transition: all 0.2s linear;
    }
  }
}
</style>