<template>
  <div>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <div class="d-flex" style="flex-wrap:wrap">
      <v-card
        style="margin:0.5rem;overflow: hidden"
        width="5rem"
        height="12rem"
        v-for="(i, index) in data.children"
        :key="index"
       @click="godeep(i)"
      >
        <div v-if="path.length==3">     
                     
                     <v-img :src="i.img" width="130" />
 
                      
             
                    
                                       <v-card-text
                        class="font-weight-medium text-center subtitle-1"
                        style="line-height:1.2rem"
                      >
                        {{ i.name }}
                  
                      </v-card-text>
          
               </div>
        <div v-else  >社区{{ i.id }}</div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getData } from "@/utils/fetch";
import { getPersonCommunityByName,getCommunityByID } from "@/utils/community";

export default {
  name: "CommunityView",
  data() {
    return {
      id1:null,
      id2:null,
      id3:null,
      breadcrumbs:[ 
        {
          text: 'Dashboard',
          disabled: false,
          href: '/#/community',
        }
        ],
      path: [],
      data: {},
      isLoading: false,
    };
  },


  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.data = await getData("../../res.json");
     vm.load();
    });
  },
  methods: {
    async load(){
    this.id1 = this.$route.params.id1;
    this.id2 = this.$route.params.id2;
    this.id3 = this.$route.params.id3;
    
     this.path=[];
     this.breadcrumbs=[ 
        {
          text: 'Dashboard',
          disabled: false,
          href: '/#/community',
        }
        ];
     if(this.id1!=null){
      this.path.push(this.data);
      this.data = await getCommunityByID(1,this.id1);
       this.breadcrumbs.push( {
          text: 'Community '+this.data.id,
          disabled: false,
          href: '/#/community/'+this.data.id,
        });
     }

     if(this.id2!=null){
      this.path.push(this.data);
      this.data = await getCommunityByID(2,this.id2);
            this.breadcrumbs.push( {
          text: 'Community '+this.data.id,
          disabled: false,
          href: '/#/community/'+this.id1+"/"+this.data.id,
        });
     }

     if(this.id3!=null){
      this.path.push(this.data );
      this.data =await getCommunityByID(3,this.id3);
            this.breadcrumbs.push( {
          text: 'Community '+this.data.id,
          disabled: false,
          href: '/#/community/'+this.id1+"/"+this.id2+"/"+this.data.id,
        });
     }
    },
    godeep(i) {
      if(this.path.length==3){
      this.$router.push("../../../node/Person/" + i.id);
        return;
      }
      this.$router.push(this.$route.path+"/" + i.id);
    },
  },
};
</script>

<style scoped></style>
