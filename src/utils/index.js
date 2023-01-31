// mengganti nama tabel yang ada di database menjadi camelCase pada updated at dan created at

const mapDBToModel = ({
    id,
    title,
    body,
    tags,
    created_at,
    updated_at,
  }) => ({
    id,
    title,
    body,
    tags, 
    createdAt: created_at,
    updatedAt: updated_at,
})

module.exports = { mapDBToModel };