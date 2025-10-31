using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// https://www.youtube.com/watch?v=WxkI70w-bwY&t=1240s

namespace Api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
            if (student == null) return NotFound();
            return student;
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent(Student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.AddAsync(student);
            var result = await _context.SaveChangesAsync();

            return result > 0 ? Ok(student) : BadRequest("Failed to create student");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();

            _context.Students.Remove(student);
            var result = await _context.SaveChangesAsync();

            return result > 0 ? Ok("Student deleted successfully") : BadRequest("Failed to delete student");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student updatedStudent)
        {
            if (id != updatedStudent.Id)
            {
                return BadRequest("Student ID mismatch");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(updatedStudent).State = EntityState.Modified;

            try
            {
                var result = await _context.SaveChangesAsync();
                return result > 0 ? Ok(updatedStudent) : BadRequest("Failed to update student");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        private async Task<bool> StudentExists(int id)
        {
            var student = await _context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
            return student != null;
        }
    }
}