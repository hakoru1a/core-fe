import ProtoTypes from "prop-types";

function SidebarTags({ tags }: any) {
  return (
    <div className="homec-sidebar__single side-tags">
      <h3 className="homec-sidebar__title">Popular Tags</h3>
      <ul className="homec-sidebar__tags list-none">
        {tags?.map((tag: any, index: any) => (
          <li key={tag + index}>
            <a href="#">{tag}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

SidebarTags.propTypes = {
  tags: ProtoTypes.array.isRequired,
};

export default SidebarTags;
