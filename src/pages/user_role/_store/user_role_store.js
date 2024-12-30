import axios from "axios";
import { create } from "zustand";

const userRoleStore = create((set, get) => ({
	users: [],
	roles: [],
	changedRoles: [],
	async fetchUsers() {
		try {
			const response = await axios.get(
				"https://api-ecatalogue-staging.online/api/user/list-user-verif"
			);
			const { data } = response;
			if (data.status === "success") {
				set({ users: data.data });
			} else {
				console.error("Gagal mendapatkan data:", data.message);
			}
		} catch (error) {
			console.error("Terjadi kesalahan saat mengambil data:", error.message);
		}
	},
	async fetchRoles() {
		try {
			const response = await axios.get(
				"https://api-ecatalogue-staging.online/api/list-role"
			);
			const { data } = response;
			const transformedData = data.data.map((role) => ({
				value: role.id,
				label: role.nama,
			}));
			console.log("Roles:", transformedData);
			if (data.status === "success") {
				set({ roles: transformedData });
			} else {
				console.error("Gagal mendapatkan data:", data.message);
			}
		} catch (error) {
			console.error("Terjadi kesalahan saat mengambil data:", error.message);
		}
	},
	addChangedRole(userId, roleId) {
		const currentChangedRoles = get().changedRoles;
		const newChangedRoles = [...currentChangedRoles, { userId, roleId }];
		set({ changedRoles: newChangedRoles });
	},
	submitData() {
		const { changedRoles } = get();
		changedRoles.forEach(async (changedRole) => {
			try {
				const formData = new FormData();
				formData.append("user_id", changedRole.userId);
				formData.append("role_id", changedRole.roleId);
				const response = await axios.post(
					"https://api-ecatalogue-staging.online/api/send-username",
					formData,
				);
				const { data } = response;
				if (data.status === "success") {
					console.log("Berhasil mengubah role user:", data);
					alert("Berhasil mengubah role user");
				} else {
					console.error("Gagal mengubah role user:", data.message);
				}
			} catch (error) {
				console.error("Terjadi kesalahan saat mengubah role user:", error.message);
			}
		}
	);
	}
}));

export default userRoleStore;
