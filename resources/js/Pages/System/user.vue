<template lang="">
    <blankVue>
        <template v-slot:title>
            <title>Data User | Point Of Sales</title>
        </template>

        <template v-slot:breadcrumbs>
            <ul>
                <li><a>system</a></li>
                <li><a>Data User</a></li>
                <li></li>
            </ul>
        </template>

        <template v-slot:alert>
            <div v-if="errors" class="toast toast-start">
                <div
                    v-if="this.alert_success"
                    class="alert alert-success shadow-lg"
                >
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{{ this.alert_success }}</span>
                    </div>
                </div>
                <div
                    v-if="this.alert_warning"
                    class="alert alert-warning shadow-lg"
                >
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>{{ this.alert_warning }}</span>
                    </div>
                </div>
                <div
                    v-if="this.alert_danger"
                    class="alert alert-error shadow-lg"
                >
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{{ this.alert_danger }}</span>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:opsibutton>
            <div class="flex justify-end">
                <a href="#modal-tambah">
                    <div
                        class="flex justify-center items-center modal-button w-24 bg-green-500 hover:bg-green-400 capitalize h-8 rounded-lg"
                    >
                        <i class="fa-solid fa-plus pr-2"></i>tambah
                    </div>
                </a>
            </div>
        </template>

        <template v-slot:konten>
            <div class="form-control mb-2">
                <div class="input-group">
                    <input
                        type="text"
                        v-model="search.value"
                        placeholder="Search…"
                        class="input input-bordered"
                    />
                    <button class="btn btn-square">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Opsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in filteredItems" :key="index">
                            <td>{{ data.nama }}</td>
                            <td>{{ data.username }}</td>
                            <td>{{ data.email }}</td>
                            <td>{{ data.role }}</td>
                            <td class="text-white flex flex-row">
                                <a href="#modal-edit">
                                    <label
                                        @click="edit(data.id)"
                                        class="flex justify-center items-center modal-button w-24 bg-blue-500 hover:bg-blue-400 capitalize h-8 rounded-lg mr-2"
                                    >
                                        <i
                                            class="fa-solid fa-pen-to-square pr-2"
                                        ></i
                                        >edit
                                    </label></a
                                >
                                <a href="#modal-hapus">
                                    <label
                                        @click="hapus(data.id)"
                                        class="flex justify-center items-center modal-button w-24 bg-red-500 hover:bg-red-400 capitalize h-8 rounded-lg"
                                    >
                                        <i class="fa-solid fa-trash pr-2"></i
                                        >hapus
                                    </label>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
        <template v-slot:modals>
            <div class="modal" id="modal-tambah">
                <div class="modal-box scrollbar-hide">
                    <h2 class="font-bold text-lg">Tambah User</h2>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nama</span>
                        </label>
                        <input
                            v-model="formtambah.nama"
                            type="text"
                            placeholder="Nama..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.nama"
                            >{{ errors.nama }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input
                            v-model="formtambah.username"
                            type="text"
                            placeholder="username..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.username"
                            >{{ errors.username }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">email</span>
                        </label>
                        <input
                            v-model="formtambah.email"
                            type="text"
                            placeholder="email..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.email"
                            >{{ errors.email }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">password</span>
                        </label>
                        <input
                            v-model="formtambah.password"
                            type="text"
                            placeholder="password..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.password"
                            >{{ errors.password }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Role</span>
                        </label>
                        <select
                            v-model="formtambah.role"
                            class="select select-bordered w-full"
                        >
                            <option
                                v-for="(item, index) in role"
                                :key="index"
                                :value="item.id"
                            >
                                {{ item.nama }}
                            </option>
                        </select>
                        <span
                            class="label-text text-red-500"
                            v-if="errors.role"
                            >{{ errors.role }}</span
                        >
                    </div>
                    <div class="modal-action">
                        <button
                            class="btn bg-green-500 btn-square loading"
                            v-if="formtambah.processing"
                        ></button>
                        <a
                            v-else
                            class="btn bg-green-500 hover:bg-green-400 text-white border-0"
                            @click="submittambah"
                            >Save</a
                        >
                        <a href="#" class="btn">Exit</a>
                    </div>
                </div>
                <a href="#" hidden id="submit"></a>
            </div>
            <div class="modal" id="modal-edit">
                <div class="modal-box scrollbar-hide">
                    <h2 class="font-bold text-lg">Edit User</h2>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nama</span>
                        </label>
                        <input
                            v-model="formedit.nama"
                            type="text"
                            placeholder="Nama..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.nama"
                            >{{ errors.nama }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input
                            v-model="formedit.username"
                            disabled
                            type="text"
                            placeholder="username..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.username"
                            >{{ errors.username }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">email</span>
                        </label>
                        <input
                            v-model="formedit.email"
                            disabled
                            type="text"
                            placeholder="email..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.email"
                            >{{ errors.email }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">password</span>
                        </label>
                        <input
                            v-model="formedit.password"
                            type="text"
                            placeholder="password..."
                            class="input input-bordered"
                        />
                        <span
                            class="label-text text-red-500"
                            v-if="errors.password"
                            >{{ errors.password }}</span
                        >
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Role</span>
                        </label>
                        <select
                            v-model="formedit.role"
                            class="select select-bordered w-full"
                        >
                            <option
                                v-for="(item, index) in role"
                                :key="index"
                                :value="item.id"
                            >
                                {{ item.nama }}
                            </option>
                        </select>
                        <span
                            class="label-text text-red-500"
                            v-if="errors.role"
                            >{{ errors.role }}</span
                        >
                    </div>
                    <div class="modal-action">
                        <button
                            class="btn bg-green-500 btn-square loading"
                            v-if="formedit.processing"
                        ></button>
                        <a
                            v-else
                            class="btn bg-green-500 hover:bg-green-400 text-white border-0"
                            @click="submitedit"
                            >Save</a
                        >
                        <a href="#" class="btn">Exit</a>
                    </div>
                    <a href="#" hidden id="submit"></a>
                </div>
            </div>
            <div class="modal" id="modal-hapus">
                <div class="modal-box scrollbar-hide">
                    <h2 class="font-bold text-lg">Konfirmasi penghapusan {{formhapus.nama}}</h2>
                    <div class="modal-action">
                        <button
                            class="btn bg-red-500 btn-square loading"
                            v-if="formhapus.processing"
                        ></button>
                        <a
                            v-else
                            class="btn bg-red-500 hover:bg-red-400 text-white border-0"
                            @click="submithapus"
                            >Save</a
                        >
                        <a href="#" class="btn">Exit</a>
                    </div>
                </div>
            </div>
        </template>
    </blankVue>
</template>
<script>
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-vue3";
import { reactive } from "vue";
import blankVue from "../Template/blank.vue";

export default {
    components: {
        blankVue,
    },
    props: {
        user: Array,
        role: Array,
        errors: Object,
        flash: Object,
    },
    setup() {
        function klik() {
            document.getElementById("submit").click();
        }
        const formtambah = useForm({
            nama: null,
            username: null,
            email: null,
            password: null,
            role: null,
        });
        function submittambah() {
            formtambah.post(route("systemuser.store"), {
                onSuccess: () => {
                    formtambah.reset();
                    klik();
                },
            });
        }
        const formedit = useForm({
            nama: null,
            username: null,
            email: null,
            password: null,
            role: null,
        });
        function submitedit() {
            formedit.put(route("systemuser.update", { user: formedit.id }), {
                onSuccess: () => {
                    formedit.reset();
                    klik();
                },
            });
        }
        const formhapus = useForm({
            id: null,
            nama: null,
        });
        function submithapus() {
            formhapus.delete(
                route("systemuser.destroy", {
                    user: formhapus.id,
                }),
                {
                    onSuccess: () => {
                        formhapus.reset();
                        klik();
                    },
                }
            );
        }
        const search = reactive({
            value: "",
        });
        return {
            formtambah,
            submittambah,
            formedit,
            submitedit,
            formhapus,
            submithapus,
            search,
        };
    },
    data() {
        return {
            alert_success: null,
            alert_warning: null,
            alert_danger: null,
        };
    },
    updated() {
        if (this.flash.alert) {
            if (this.flash.alert["type"] == "success") {
                this.alert_success = this.flash.alert["message"];
                setTimeout(() => (this.alert_success = null), 5000);
            }
            if (this.flash.alert["type"] == "warning") {
                this.alert_warning = this.flash.alert["message"];
                setTimeout(() => (this.alert_warning = null), 5000);
            }
            if (this.flash.alert["type"] == "danger") {
                this.alert_danger = this.flash.alert["message"];
                setTimeout(() => (this.alert_danger = null), 5000);
            }
        }
    },
    methods: {
        edit(id) {
            var data;
            this.user.filter(items => {
                if(items.id == id){
                    data = items
                }
            })
            this.formedit.id = data.id
            this.formedit.nama = data.nama
            this.formedit.username = data.username
            var role;
            this.role.filter(items=>{
                if(items.nama == data.role){
                    role = items
                }
            })
            this.formedit.role = role.id
            this.formedit.email = data.email
        },
        hapus(id) {
            var data;
            this.user.filter(items => {
                if(items.id == id){
                    data = items
                }
            })
            this.formhapus.id = data.id
            this.formhapus.nama = data.nama
        },
    },
    computed: {
        filteredItems() {
            return this.user.filter((item) => {
                return (
                    item.nama
                        .toLowerCase()
                        .indexOf(this.search.value.toLowerCase()) > -1
                );
            });
        },
    },
};
</script>
<style lang=""></style>
