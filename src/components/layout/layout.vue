<template>
  <div class="layout">
    <Layout>
      <Header :style="{width: '100%'}">
        <div style="display: flex;align-items:center; justify-content:space-between;margin:0 20px">
          <div>
            <span class="layout-logo"></span>
            <Icon
              @click.native="hideSider"
              :class="rotateIcon"
              type="md-menu"
              color="#E1E1E1"
              size="30"
            ></Icon>
          </div>
          <div>
            <Dropdown @on-click="userConfig">
              <a href="javascript:void(0)" style="font-size:18px">
                <Icon type="md-person" size="22"></Icon>
                {{user}}
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="changePwd">修改密码</DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout :style="{height:'calc(100vh - 66px)'}">
        <Sider
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="0"
          v-model="isCollapsed"
          :style="{height:'100%', overflow: 'auto'}"
          class="scroll"
        >
          <Menu
            :active-name="path"
            theme="dark"
            width="auto"
            style="height:100%"
            :open-names="[path]"
            :class="menuitemClasses"
          >
            <MenuItem name="home" to="/home" v-if="role == '2'">
              <Icon type="ios-navigate"></Icon>
              <span>首页</span>
            </MenuItem>
            <MenuItem name="webList" to="/webList" v-if="role == '2'">
              <Icon type="logo-buffer"></Icon>
              <span>网站列表</span>
            </MenuItem>
            <MenuItem name="application" to="/application" v-if="role == '1'">
              <Icon type="ios-keypad"></Icon>
              <span>应用管理</span>
            </MenuItem>
            <!-- <MenuItem name="certificate" to="/certificate" v-if="role == '1'">
              <Icon type="ios-paper-outline" />
              <span>证书管理</span>
            </MenuItem>-->
            <MenuItem name="waf" to="/waf" v-if="role == '1'">
              <Icon type="ios-browsers-outline" />
              <span>WAF策略</span>
            </MenuItem>
            <MenuItem name="cc" to="/cc" v-if="role == '1'">
              <Icon type="ios-planet-outline" />
              <span>CC策略</span>
            </MenuItem>
            <MenuItem name="waflogs" to="/waflogs" v-if="role == '2'">
              <Icon type="ios-planet-outline" />
              <span>攻击日志</span>
            </MenuItem>
            <MenuItem name="cclogs" to="/cclogs" v-if="role == '2'">
              <Icon type="ios-planet-outline" />
              <span>CC日志</span>
            </MenuItem>
            <MenuItem name="scanlogs" to="/scanlogs" v-if="role == '2'">
              <Icon type="ios-planet-outline" />
              <span>扫描日志</span>
            </MenuItem>
            <MenuItem name="accesslogs" to="/accesslogs" v-if="role == '2'">
              <Icon type="ios-planet-outline" />
              <span>访问日志</span>
            </MenuItem>
            <!-- <MenuItem name="nodes" to="/nodes">
              <Icon type="md-git-network" />
              <span>节点管理</span>
            </MenuItem>-->
            <MenuItem name="users" to="/users" v-if="role == '1'">
              <Icon type="md-people" />
              <span>用户管理</span>
            </MenuItem>
            <Submenu name="ttt" v-if="role == '1'">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>Item 3
              </template>
              <MenuItem name="ttt" to="/ttt">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
            <!-- <Submenu name="4">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>Item 3
              </template>
              <MenuItem name="4-1">Option 1</MenuItem>
              <MenuItem name="4-2">Option 2</MenuItem>
            </Submenu>-->
          </Menu>
        </Sider>
        <Layout>
          <Content
            id="scrollDiv"
            ref="cont"
            :style="{height:'100%',background: '#F2F2F2',marginBottom:'40px'}"
          >
            <keep-alive :include="keep">
              <router-view v-if="isRouterAlive" style="padding-bottom:35px"></router-view>
            </keep-alive>
            <BackTop></BackTop>
            <footer ref="footer">
              <div style="margin:0 auto;width:100%">©和盾 版权所有</div>
            </footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  // 子页面不跳转刷新
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      icon: 'open',
      isCollapsed: false,
      path: this.$route.path.substr(1),
      isRouterAlive: true,
      user: '',
      role: '',
      keep: ['scanlogs', 'cclogs', 'waflogs', 'accesslogs']
    }
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem('user'))
    this.role = JSON.parse(window.localStorage.getItem('role'))
  },
  methods: {
    checkDivScroolTop() {
      //获取节点
      var scrollDiv = document.getElementById('scrollDiv')
      //绑定事件
      scrollDiv.addEventListener('scroll', function() {
        if (scrollDiv.scrollTop > 200) {
        }
      })
    },
    userConfig(name) {
      if (name === 'logout') {
        window.localStorage.removeItem('access-user')
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      } else {
        this.$router.push('/changepwd')
      }
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    hideSider() {
      if (this.icon == 'open') {
        this.icon = 'close'
        this.$refs.footer.style.width = '100%'
      } else {
        this.icon = 'open'
        this.$refs.footer.style.width = 'calc(100% - 200px)'
      }
      this.$refs.side1.toggleCollapse()
    }
  },
  mounted() {
    this.checkDivScroolTop()
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  watch: {
    $route(to, from) {
      // this.contentHeight = document.documentElement.clientHeight - 66 + "px";
    }
  }
}
</script>
<style scoped>
.ivu-layout-header {
  padding: 0;
}
.ivu-back-top {
  z-index: 99999;
}
.layout {
  position: relative;
}
.layout-logo {
  display: inline-block;
  width: 90px;
  height: 37px;
  background: url('../../img/logo1.png');
  background-size: cover;
  vertical-align: middle;
  margin-right: 10px;
}

footer {
  position: fixed;
  bottom: 0;
  width: calc(100% - 200px);
  z-index: 1000;
  background-color: #fff;
  padding: 10px 0;
  text-align: center;
  border-top: 1px solid rgb(228, 225, 225);
}
.rotate-icon {
  transition: all 0.3s;
  transform: rotate(-90deg);
}
.collapsed-menu {
  width: 0px;
  transition: width 0.1s ease;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.scroll::-webkit-scrollbar {
  display: none;
}
</style>
