const mongoose = require("mongoose")
const {Schema, model} = mongoose

const RolePermissionSchema = new Schema({
    roleId: {type: Schema.Types.ObjectId, ref: 'Role', required: true},
    permissionId: {type: Schema.Types.ObjectId, ref: 'Permission', required: true},
}, {timestamps: true})

module.exports = model("RolePermission", RolePermissionSchema)