import { iwa, iwaId, iwaIdUrl } from "instagram-without-api-node";

export default defineEventHandler(async () => {
  const _cookie =
    'mid=YyODpwAEAAFkiDpH2WTKuprN_OqDig_did=C9396085-EFD5-4FEC-9A81-471DF74F64AF; csrftoken=VXkAiFTdL1uDAgR5Bz3JVVja1T9oYVFO; ds_user_id=55500146504; dpr=2; shbid="9226555001465041695141532:01f79fd06cb4b5027f681c0ded13e2635c4b40ac56739fdd1606c943fcb98ce9ff2b8fb7"; shbts="1663605532555001465041695141532:01f79fb8195f4560a81a266c389d545b4dc8b82a13866381eba9ea72d8cc0317896829d1"; fbm_124024574287414=base_domain=.instagram.com; fbsr_124024574287414=hhpjArkzvh_0R3QklHBvj_IgqSTuDKLSD8WfiYTfmuY.eyJ1c2VyX2lkIjoiMTYzNjYyNzY5MyIsImNvZGUiOiJBUUNWaHRmNDlSMFNXSDAtV00ySk11STFNQ1BMTkxMRmg3MHFNWXd3SWMybmw4YVhJOURYR1JpN185OTFRX2VSZW9RM29BOFZkbnk2TnBYcE80VVJPamdHVEVzQW1DRXFucDByY3dsaEhyOXJJdlJ4U0VXRW5FSzJBTDlWSnBpLWZ0TFhGX1ByNFFObHpPaVhURFV5N0YtREEtdHk5OEkxNk5NdHBPM05fdmdSSXdlQlZuY3JUQzZvVTJPNk9sZWZwVXBfWmhGNE5pSVduUFlhYmJBQ3FGX1FBX2prQXhkU28yNEo3VWt2SGZnSWdWTmt1ODJrRXFxNHpmVzFMcGlRQWtsVy1BSk9jM09SVy1ZUnJYTzNWeFZvc0YxcGliYkFsc0JCdWZIdm52aFBUVEd3YjdkRFdESncxX1duRm9CMl9rVSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFBWkFPQm5Ia21FSlNhUEtPdllVVGFPT1hSWXhsa1dkdDA3T1dEdUx2TVFaQW5za2YxT2dFUGU4Q1BINWVNNVpCaG5IdVZpVWFZMUpNdUFsWEw5T01aQ2huV2Z0a0FCQ2NIb1V3NVFidml3MXhqS2VHVE94ajZsZDlMUk5YS2N0a2loeHZaQkgxM3BranlBYWZBM0F5VThaQU9wNnl6TU9KSTZSTkFwTUNNIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2NjM2MDU3MDF9; sessionid=55500146504:AjHNR7cRWoUIIa:29:AYf4BRcjEJGihhdWXzFaqBEWFcor87wKwIh_ucQRNg; datr=wpsoYzC6NUohPBwXSvMjXMYy; rur="NAO555001465041695141753:01f7bd07ea11a74fdcdab69ffdc6c2e4e3a91c8d046c7dbf8ee766fee14357a0f53bf41d"';
  const _userAgent =
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"; // <!-- required!! please get your user-agent from your browser console (7)
  const _xIgAppId = "1217981644879628";

  const igtoken =
    "IGQVJYMFdfZAUxXQXpPYS14bTN5NlZAMbkxsZAGlCU0xmanVQMmdjMHBLbDBYcnl4dGJqWWhUcmhnSVF0UDlreXdfaWxsZAllrZAHlTRHQ1MUFMMUR2UnlUWkhYclloa2Q5WmVaeS0tTTNTaThDZA19Qd2VUcAZDZD";
  try {
    // const responseIwa = await iwa({
    //   headers: {
    //     cookie: _cookie,
    //     "user-agent": _userAgent,
    //     "x-ig-app-id": _xIgAppId,
    //   },

    //   base64images: false, // <!-- optional, but without it, you will be not able to store/show images
    //   maxImages: 2, // <!-- optional, 12 is the max number
    //   file: "instagram-cache.json", // <!-- optional, instagram-cache.json is by default
    //   pretty: true, // <!-- optional, prettyfy json true/false
    //   time: 3, // <!-- optional, reload contents after 3600 seconds by default

    //   id: "miltoncollabo", // <!-- id is required
    // });

    // // console.log(responseIwa);
    const responseIwaIdUrl = await iwaIdUrl({

      headers: {
          'cookie': _cookie,
          'user-agent': _userAgent,
          'x-ig-app-id': _xIgAppId
      },

      base64images: false,                    // <!-- optional, but without it, you will be not able to store/show images
      file: "instagram-cache-byidurl.json",   // <!-- optional, instagram-cache.json is by default
      pretty: true,                           // <!-- optional, prettyfy json true/false
      time: 3,                             // <!-- optional, reload contents after 3600 seconds by default

      id: "Cif7n9PLAdT"                       // <!-- id is required

  })

  console.log(responseIwaIdUrl);

    return { data: responseIwaIdUrl };
  } catch (err) {
    console.log(err);
  }
});
