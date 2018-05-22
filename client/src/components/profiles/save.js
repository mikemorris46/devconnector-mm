{
  isEmpty(profile.social && profile.social.twitter) ? null : (
    <a className="text-white p-2" href={profile.social.twitter} target="_blank">
      <FontAwesomeIcon icon={['fab', 'twitter']} className="fa-2x" />
    </a>
  );
}
{
  isEmpty(profile.social && profile.social.facebook) ? null : (
    <a
      className="text-white p-2"
      href={profile.social.facebook}
      target="_blank"
    >
      <FontAwesomeIcon icon={['fab', 'facebook']} className="fa-2x" />
    </a>
  );
}
{
  isEmpty(profile.social && profile.social.linkedin) ? null : (
    <a
      className="text-white p-2"
      href={profile.social.linkedin}
      target="_blank"
    >
      <FontAwesomeIcon icon={['fab', 'linkedin']} className="fa-2x" />
    </a>
  );
}
{
  isEmpty(profile.social && profile.social.youtube) ? null : (
    <a className="text-white p-2" href={profile.social.youtube} target="_blank">
      <FontAwesomeIcon icon={['fab', 'youtube']} className="fa-2x" />
    </a>
  );
}
{
  isEmpty(profile.social && profile.social.instagram) ? null : (
    <a
      className="text-white p-2"
      href={profile.social.instagram}
      target="_blank"
    >
      <FontAwesomeIcon icon={['fab', 'instagram']} className="fa-2x" />
    </a>
  );
}
