using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class scalar : MonoBehaviour
{

    void Update ()
     {
         Vector3 vec = new Vector3(Mathf.Sin(Time.time) + 1, Mathf.Sin(Time.time) + 1, Mathf.Sin(Time.time) + 1);
 
         transform.localScale = vec;
     }
}
