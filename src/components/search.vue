<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col lg="6" md="6" sm="12">
        <div :class="{'centerbox': songCount==0}">
          <v-toolbar dense height="60px">
            <v-text-field
              hide-details
              prepend-icon="search"
              label="Search Music"
              @keyup.enter="search"
              v-model="keywords"
            ></v-text-field>
          </v-toolbar>
          <div class="text-center pt-2" v-if="songCount==0" transition="fade-transition">
            <v-chip
              class="ma-2"
              :color="colors[i]"
              label
              text-color="white"
              v-for="(hot, i) in hots"
              v-bind:key="i"
              @click="keywords=hot.first;search()"
            >{{hot.first}}</v-chip>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" v-if="songCount > 0">
      <v-col lg="6" md="6" sm="12">
        <v-card class="mx-auto" tile transition="fade-transition">
          <v-data-table
            :headers="songs_table_headers"
            :items="songs"
            :page.sync="page"
            hide-default-footer
            class="elevation-1"
            loading-text="Loading...Please wait"
            :server-items-length="songCount"
            :loading="songs_loading"
          >
            <template v-slot:item.name="{item}">
              <router-link style="color:#8AB097" target="_blank" :to="{name:'song', params:{id: item.id}}">{{item.name}}</router-link>
            </template>
            <template v-slot:item.artists="{item}">
              <span v-for="(art, index) in item.artists" :key="index">{{art.name}}&nbsp;</span>
            </template>
            <template v-slot:item.duration="{item}">
              {{item.duration}}
            </template>
          </v-data-table>
          <div class="text-center pt-2">
              <v-pagination circle v-model="page" :length="songCount">
              </v-pagination>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      colors: ['pink', 'primary', 'cyan', 'red', 'green', 'orange', 'blue', 'purple', 'brown', 'amber'],
      songs_table_headers: [
        {
          text: 'Song',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Artist',
          align: 'start',
          sortable: false,
          value: 'artists'
        },
        {
          text: 'Duration',
          align: 'start',
          sortable: false,
          value: 'duration'
        }
      ],
      keywords: '',
      hots: [],
      songCount: 0,
      songs_loading: false,
      songs: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 30
    }
  },
  watch: {
    page: {
      handler () {
        this.search()
      },
      deep: true
    },
    keywords: {
      handler () {
        this.page = 1
      }
    }
  },
  methods: {
    get_hot () {
      this.$http.get('/search/hot').then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.hots = res.data.result.hots
        }
      })
    },
    search () {
      this.songs_loading = true
      this.$http.get('/search', {
        params: {
          type: 1,
          keywords: this.keywords,
          limit: this.itemsPerPage,
          offset: (this.page - 1) * this.itemsPerPage
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.songs = res.data.result.songs
            this.songCount = res.data.result.songCount
            this.pageCount = Math.ceil(this.songCount / this.itemsPerPage)
          } else {
            this.songs = []
            this.songCount = 0
            this.pageCount = 0
          }
          this.songs_loading = false
        })
    }
  },
  created () {
    this.get_hot()
  }
}
</script>

<style scoped>
    .centerbox{
    position: absolute;
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
