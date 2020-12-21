<template>
  <div class="navheader__content">
    <v-btn class="ma-2 search" icon @click="showDialog">
      <v-icon :color="primaryColor">mdi-magnify</v-icon>
    </v-btn>
    <v-overlay :value="dialog" color="white" dark opacity="0.95" justify="center" v-if="dialog">
      <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        class="navheader__search-dialog"
      >
      <v-card>
        <v-container fluid class="align-start ma-0 pa-0">
          <v-layout column>
            <v-row class="pa-5">
              <v-col cols="11"></v-col>

              <v-spacer></v-spacer>

              <v-col>
                <v-btn icon dark @click="dialog = false">
                  <v-icon :color="darkColor" size="50">mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="align-start">
              <v-col md="4" xs="4" offset-lg="2">
                <v-form>
                  <v-text-field
                    label
                    id="search"
                    prepend-inner-icon="mdi-magnify"
                    type="text"
                    autofocus
                    :color="primaryColor"
                    :placeholder="$t('common.search')"
                    class="search-input"
                    @keyup="onEnter"
                    v-model="textsearch"
                    data-textsearch
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="justify-start">
              <v-col cols="1"></v-col>
              <v-col>
                <v-card
                  class="mx-2 my-4 nav-menu"
                  tile
                  v-for="(item, i) in searchResults"
                  :key="i"
                  @click="navigate(item.route)"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon large left>{{item.icon}}</v-icon>
                        <span class="subtitle-2 font-weight-light px-2">{{item.title}}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col cols="1" class></v-col>
            </v-row>
          </v-layout>
        </v-container>
        </v-card>
      </v-dialog>
    </v-overlay>
  </div>
</template>

<script>

export default {
  name: 'globalSearch',
  props: {
    config: Object
  },
  methods: {
    showDialog () {
      this.drawer = false
      return (this.dialog = true)
    },
    onEnter () {
      let filteredArray
      var textEntered = this.textsearch.toLowerCase()
      if (textEntered.length >= 3) {
        filteredArray = this.navigationMenu.map(subitem => {
          if (subitem.title.toLowerCase().search(textEntered) > -1) {
            return subitem
          }
        })
        filteredArray = filteredArray.filter(function fn (nnitem) {
          return nnitem !== undefined
        })
      }
      this.searchResults = filteredArray
    },
    navigate (to) {
      this.dialog = false
      this.$router.push(to)
    }
  },
  data () {
    return {
      dialog: false,
      searchResults: [],
      textsearch: '',
      navigationMenu: this.$navigation.menuStructure
    }
  }
}
</script>
<style lang="scss" scoped>
.search-input {
  transform: scale(2);
  transform-origin: left;
}
.navheader__search-dialog {
  overflow-x: hidden;
}
</style>
