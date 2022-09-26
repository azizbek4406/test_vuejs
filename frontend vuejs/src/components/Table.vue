<template>
    <div class="container">

        <input type="text" v-model="searchQuery" class="input" placeholder="Search to text">

        <table id="customers">
            <tr>
                <th @click="sort('id')">No <img src="../assets/asdfasd.png" alt="" width="20"></th>
                <th @click="sort('name')">Name <img src="../assets/asdfasd.png" alt="" width="20"></th>
                <th @click="sort('data')">Data <img src="../assets/asdfasd.png" alt="" width="20"></th>
                <th @click="sort('quantity')">Quantity <img src="../assets/asdfasd.png" alt="" width="20"></th>
                <th @click="sort('distance')">Distance <img src="../assets/asdfasd.png" alt="" width="20"></th>
            </tr>

            <tr v-for="comment in filteredItems">
                <td>{{comment.id}}</td>
                <td>{{ comment.name }}</td>
                <td>{{ comment.data }}</td>
                <td>{{ comment.quantity }}</td>
                <td>{{ comment.distance }}</td>
            </tr>
        </table>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            comments: [],
            currentSort: 'id',
            currentSortDir: 'asc',
            searchQuery: ""
        }
    },
    methods: {
        async fetchComments() {
            try {
                const response = await axios.get('http://localhost:3000/api/users')
                this.comments = response.data
            } catch (e) {
                console.log(e);
            }
        },
        sort: function (s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        }




    },
    mounted() {
        this.fetchComments()
        console.log(this.sortedAndSearchComments());
    },
    computed: {
        sortedComment: function () {
            return this.comments.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            });
        },
        filteredItems() {
            return this.sortedComment.filter(item => {
                return item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 ||
                    item.quantity.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1 ||
                    item.data.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
            })
        }

    }
}
</script>
<style>
.container {
    padding: 50px;
    margin-top: 10px;
    border: 2px solid #d4d3d3f4;
    background-color: #f4f4f4f4;
}

#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    box-shadow: 2px 2px 8px 2px black;
}

#customers td,
#customers th {
    border: 1px solid #ddd;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #f2f2f2;
}

#customers tr:hover {
    background-color: #ddd;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}

td {
    text-align: center;
}

.mb-2 {
    float: right;
}

th {
    cursor: pointer;
}

.input {
    margin: 10px;
    margin-top: -20px;
    width: 30%;
    padding: 5px;
}
</style>