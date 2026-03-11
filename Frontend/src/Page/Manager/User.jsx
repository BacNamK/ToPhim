import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUsers,
  handleUpdateUser,
} from "../../API/User";

const defaultCreateForm = {
  username: "",
  email: "",
  password: "",
  isadmin: false,
};

const MNUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(defaultCreateForm);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    password: "",
    isadmin: false,
  });
  const [savingUserId, setSavingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => Number(b?.id || 0) - Number(a?.id || 0)),
    [users],
  );

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await handleGetUsers();
      const userData = Array.isArray(response?.data) ? response.data : [];
      setUsers(userData);
    } catch (error) {
      toast.error(error?.message || "Không tải được danh sách user!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onCreateChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onCreateSubmit = async (event) => {
    event.preventDefault();

    if (!createForm.username || !createForm.email || !createForm.password) {
      toast.error("Vui lòng nhập username, email, password!");
      return;
    }

    try {
      setIsSubmittingCreate(true);
      const response = await handleCreateUser(createForm);
      const createdUser = response?.data?.user;

      if (createdUser) {
        setUsers((prev) => [createdUser, ...prev]);
      } else {
        await getUsers();
      }

      setCreateForm(defaultCreateForm);
      setIsCreateOpen(false);
      toast.success("Tạo user thành công!");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Tạo user thất bại!");
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const onStartEdit = (user) => {
    setEditingUserId(user.id);
    setEditForm({
      username: user.username || "",
      email: user.email || "",
      password: "",
      isadmin: Boolean(user.isadmin),
    });
  };

  const onCancelEdit = () => {
    setEditingUserId(null);
    setEditForm({
      username: "",
      email: "",
      password: "",
      isadmin: false,
    });
  };

  const onEditChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSaveEdit = async (userId) => {
    if (!editForm.username || !editForm.email) {
      toast.error("Username và email không được để trống!");
      return;
    }

    const payload = {
      username: editForm.username,
      email: editForm.email,
      isadmin: editForm.isadmin,
    };

    if (editForm.password.trim()) {
      payload.password = editForm.password.trim();
    }

    try {
      setSavingUserId(userId);
      const response = await handleUpdateUser(userId, payload);
      const updatedUser = response?.data?.user;

      if (updatedUser) {
        setUsers((prev) =>
          prev.map((item) => (item.id === userId ? updatedUser : item)),
        );
      } else {
        await getUsers();
      }

      onCancelEdit();
      toast.success("Cập nhật user thành công!");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Cập nhật user thất bại!");
    } finally {
      setSavingUserId(null);
    }
  };

  const onDeleteUser = async (user) => {
    const userId = user?.id;
    if (!userId) {
      toast.error("Không tìm thấy user để xóa!");
      return;
    }

    const isConfirm = window.confirm(
      `Bạn có chắc muốn xóa user "${user?.username || "N/A"}"?`,
    );
    if (!isConfirm) return;

    try {
      setDeletingUserId(userId);
      await handleDeleteUser(userId);
      setUsers((prev) => prev.filter((item) => item.id !== userId));
      toast.success("Xóa user thành công!");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Xóa user thất bại!");
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="w-full p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsCreateOpen((prev) => !prev)}
          className="text-2xl font-bold"
        >
          {isCreateOpen ? "Đóng form tạo User" : "Thêm User"}
        </button>
        <button
          type="button"
          onClick={getUsers}
          className="px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm"
        >
          Tải lại
        </button>
      </div>

      {isCreateOpen && (
        <form
          onSubmit={onCreateSubmit}
          className="rounded-xl border border-gray-700 bg-gray-900 p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="username"
            value={createForm.username}
            onChange={onCreateChange}
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            name="email"
            value={createForm.email}
            onChange={onCreateChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            type="password"
            name="password"
            value={createForm.password}
            onChange={onCreateChange}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-800 md:col-span-2"
          />

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="isadmin"
              checked={createForm.isadmin}
              onChange={onCreateChange}
            />
            <span>Quyền Admin</span>
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmittingCreate}
              className="bg-orange-600 px-6 py-2 rounded font-semibold disabled:opacity-70"
            >
              {isSubmittingCreate ? "Đang tạo..." : "Lưu user"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Danh sách user quản lý</h2>

        {isLoading && (
          <div className="p-4 rounded-lg bg-gray-800 text-gray-300">
            Đang tải danh sách user...
          </div>
        )}

        {!isLoading && sortedUsers.length === 0 && (
          <div className="p-4 rounded-lg bg-gray-800 text-gray-300">
            Chưa có user nào trong hệ thống.
          </div>
        )}

        {!isLoading && sortedUsers.length > 0 && (
          <div className="space-y-3">
            {sortedUsers.map((user) => {
              const isEditing = editingUserId === user.id;
              const isSaving = savingUserId === user.id;
              const isDeleting = deletingUserId === user.id;

              return (
                <div
                  key={user.id}
                  className="rounded-xl bg-gray-900 border border-gray-700 p-4"
                >
                  {!isEditing && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {user.username || "N/A"}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            user.isadmin ? "bg-yellow-600" : "bg-gray-700"
                          }`}
                        >
                          {user.isadmin ? "Admin" : "User"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-300">{user.email}</p>
                      <p className="text-xs text-gray-400">
                        ID: {user.id} | Tạo lúc:{" "}
                        {user.created_at
                          ? new Date(user.created_at).toLocaleString()
                          : "N/A"}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => onStartEdit(user)}
                          className="text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-500"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteUser(user)}
                          disabled={isDeleting}
                          className="text-xs px-3 py-1 rounded bg-red-600 hover:bg-red-500 disabled:opacity-60"
                        >
                          {isDeleting ? "Đang xóa..." : "Xóa"}
                        </button>
                      </div>
                    </div>
                  )}

                  {isEditing && (
                    <div className="space-y-3">
                      <input
                        name="username"
                        value={editForm.username}
                        onChange={onEditChange}
                        placeholder="Username"
                        className="w-full p-2 rounded bg-gray-800"
                      />
                      <input
                        name="email"
                        value={editForm.email}
                        onChange={onEditChange}
                        placeholder="Email"
                        className="w-full p-2 rounded bg-gray-800"
                      />
                      <input
                        type="password"
                        name="password"
                        value={editForm.password}
                        onChange={onEditChange}
                        placeholder="Password mới (để trống nếu giữ nguyên)"
                        className="w-full p-2 rounded bg-gray-800"
                      />
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isadmin"
                          checked={editForm.isadmin}
                          onChange={onEditChange}
                        />
                        <span>Quyền Admin</span>
                      </label>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onSaveEdit(user.id)}
                          disabled={isSaving}
                          className="text-xs px-3 py-1 rounded bg-green-600 hover:bg-green-500 disabled:opacity-60"
                        >
                          {isSaving ? "Đang lưu..." : "Lưu"}
                        </button>
                        <button
                          type="button"
                          onClick={onCancelEdit}
                          className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MNUser;
