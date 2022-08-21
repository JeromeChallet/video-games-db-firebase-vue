<template>
  <div class="game-list">

    <div class="title has-text-centered">Game list</div>

    <form
      @submit.prevent="addGame"
    >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input 
          v-model="newGameContent"
          class="input" 
          type="text" 
          placeholder="Add a game">
        </p>
        <p class="control">

          <button 
            :disabled="!newGameContent"
            class="button is-info"
          >
            Add
          </button>
        </p>
      </div>
    </form>



    <div 
    v-for="game in gameList"
    class="card mb-5"
    :class="{ 'has-background-success-light': game.done }"
    >
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div 
              class="column"
              :class="{ 'has-text-success line-through': game.done }"
            >
              {{game.content}}
            </div>
             <div class="column is-6 has-text-right"><!-- if button stack is-6 change -->
              <button
              @click="toggleDone(game.id)"
              class="button"
              :class="game.done ? 'is-success' : 'is-light'"
              >
                &check;
              </button> 
              <button 
                @click="deleteGame(game.id)"
                class="button is-danger ml-2">
                &cross;
              </button> 
            </div>
          </div>   
          
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
//  import
import {ref, onMounted} from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy} from 'firebase/firestore'
import {db} from '@/firebase'

// firebase refs

const gameListCollectionRef = collection(db, 'gameList')
const gameListCollectionQuery = query(gameListCollectionRef, orderBy('date', 'desc'))

// game list
const gameList = ref([
  // {
  //   id: 'id1',
  //   content: 'mgs',
  //   done: false
  // },
  // {
  //   id: 'id2',
  //   content: 'pe',
  //   done: true
  // }
])

// get game list
onMounted( () => {
  onSnapshot(gameListCollectionQuery, (querySnapshot) => {
    const fbGamelist = []
    querySnapshot.forEach((doc) => 
    {
      const game = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbGamelist.push(game)   
     })
    gameList.value = fbGamelist
   })
})

// add game
const newGameContent = ref('')

const addGame = () => {
  addDoc(gameListCollectionRef, {
    content: newGameContent.value,
    done: false,
    date: Date.now()
  });
  newGameContent.value = ''
}


//delete game
const deleteGame = id => {
  deleteDoc(doc(gameListCollectionRef, id));
}

// toggle done
const toggleDone = id => {
  const index = gameList.value.findIndex(game => game.id === id)
  
  updateDoc(doc(gameListCollectionRef, id), {
      done: !gameList.value[index].done
  });
}


</script>

<style>
@import 'bulma/css/bulma.min.css';

.game-list {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>