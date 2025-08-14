<script setup lang="ts">
import { Plus, UsersRound } from 'lucide-vue-next';
import Button from '~/components/ui/button/button.vue';
import Card from '~/components/ui/card/card.vue';


const router = useRouter();


/**
 * Show details user
 */
const handleShow = () => {
  router.push({ path: `/users/${uuid}` })
}

const handleCreate = () => {
  router.push(`/users/create`)
}

</script>

<template>

  <div class="p-5">
    <Card class="p-5">
      <CardTitle primary-title>
        <div class="flex justify-between">
          <Button class="cursor-pointer" @click="handleCreate">
            <Plus />
            Create User
          </Button>
        </div>
      </CardTitle>
    </Card>
  </div>
</template>