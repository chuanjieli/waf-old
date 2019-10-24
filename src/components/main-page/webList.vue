<template>
  <div style="position: relative;">
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">受防护网站列表</p>
          <Table stripe :columns="columns1" :data="data1"></Table>
        </Card>
      </Col>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spinShow: true,
      columns1: [
        {
          title: '序号',
          key: 'id',
          align: 'center'
        },
        {
          title: '网站名称',
          key: 'web_name',
          align: 'center'
        },
        {
          title: '网站域名',
          key: 'web_domain',
          align: 'center'
        },
        {
          title: '协议类型',
          key: 'web_protocol',
          align: 'center'
        },
        {
          title: '接入时间',
          key: 'protection_time',
          align: 'center'
        },
        {
          title: '报表',
          key: 'cont',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    to: '/report/' + params.row.web_domain + '/' + this.day
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.show(params.index);
                    }
                  }
                },
                '日报'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    to: '/report/' + params.row.web_domain + '/' + this.month
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index);
                    }
                  }
                },
                '月报'
              )
            ])
          }
        }
      ],
      data1: [],
      day: '',
      month: ''
    }
  },
  methods: {
    dateStr(param = 0) {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, 0)
      let day = date
        .getDate()
        .toString()
        .padStart(2, 0)
      let str = year + '-' + month
      if (param) {
        str += '-' + day
      }
      return str
    }
  },
  created() {
    this.day = this.dateStr(1)
    this.month = this.dateStr()
    var that = this
    this.$http
      .get('/web_all_list/')
      .then(function(response) {
        if (response.data.code) {
          that.$Message.error({
            content: response.data.msg,
            duration: 5
          })
          if (
            response.data.msg == 'You are not logged in, please login first!'
          ) {
            that.$router.push('/login')
          }
          return
        }
        that.data1 = response.data.data.all_web_list
        that.spinShow = false
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
</script>

